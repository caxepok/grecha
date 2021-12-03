using Grecha.OpenCV;
using Grecha.Server.Hubs;
using Grecha.Server.Models.API;
using Grecha.Server.Models.DB;
using Grecha.Server.Services.Interfaces;
using grechaserver.Infrastructure;
using grechaserver.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace grechaserver.Services
{
    /// <inheritdoc cref="IImageService"/>
    public class ImageService : IImageService
    {
        private readonly ILogger _logger;
        private readonly AppSettings _appSettings;
        private readonly GrechaDBContext _grechaDBContext;
        private readonly IChannelWriterService<MeasureInfo> _channelWriterService;
        private readonly IHubContext<ClientHub> _clientHub;

        /// <summary>
        /// последнее изображение сверху
        /// </summary>
        private static byte[] UpImage;
        /// <summary>
        /// Последнее изображение сбоку
        /// </summary>
        private static byte[] SideImage;

        public ImageService(ILogger<ImageService> logger, IOptions<AppSettings> options, IChannelWriterService<MeasureInfo> channelWriterService,
            IHubContext<ClientHub> clientHub, GrechaDBContext grechaDBContext)
        {
            _logger = logger;
            _grechaDBContext = grechaDBContext;
            _channelWriterService = channelWriterService;
            _appSettings = options.Value;
            _clientHub = clientHub;
        }

        public async Task ProcessImage(string side, byte[] image)
        {
            // нам нужно дождаться пока придут изображения с обоих камер
            // чтобы рассматривать их как один цельный снимок
            // в проде такого не будет, т.к. Jetson Nano на кране будет присылать только метаданные,
            // а изоражения с камер можно будет запросить on-demand
            switch (side)
            {
                case "up":
                    UpImage = image;
                    break;
                case "side":
                    SideImage = image;
                    break;
            }
            // тут же где-то должна быть проверка на то, что в кадре сейчас кран\ковш\машнит
            // в этом случае анализ не нужно проводить, т.к. он в изображении будет мешать
            if (UpImage != null && SideImage != null)
            {
                byte[] upImage = UpImage;
                byte[] sideImage = SideImage;

                var utc = DateTimeOffset.UtcNow;

                try
                {
                    int quality = ProcessUpImage(upImage);
                    string cartNumber = ProcessSideImage(sideImage);
                    if (cartNumber == String.Empty)
                        return;

                    var cart = _grechaDBContext.Carts.Include(_ => _.Supplier).SingleOrDefault(_ => _.Number == cartNumber);
                    if (cart == null)
                    {
                        // новый вагон, сохраним его
                        // предполагаем что у нас вагон на второй линии, и поставщик номер 1 (т.к. пока нет каталога поставщиков)
                        cart = new Cart() { Number = cartNumber, Line = 2, SupplierId = 1 };    
                        _grechaDBContext.Add(cart);
                        await _grechaDBContext.SaveChangesAsync();
                    }
                    // сохраняем инфу об измерении
                    Measure measure = new Measure() { CartId = cart.Id, Quality = quality, Timestamp = utc };
                    cart.Quality = quality;
                    cart.QualityLevel = CalculateQualityLevel(quality);
                    _grechaDBContext.Add(measure);
                    await _grechaDBContext.SaveChangesAsync();
                    // ... и изображение на будущее
                    await StoreShotsAsync(cart.Id, measure.Id, upImage, sideImage);
                    
                    // шлём уведоление клиентам (фронт + планшет)
                    var measureInfo = new MeasureInfo() { CartNumber = cartNumber, Quality = quality, CartId = cart.Id, LineNumber = cart.Line, 
                        QualityLevel = cart.QualityLevel, MeasureId = measure.Id, Weight = 120, SupplierName = cart.Supplier.Name };

                    _channelWriterService.WriteToChannel(measureInfo);
                    await _clientHub.Clients.All.SendAsync("Measured", measureInfo);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to process images");
                }
                finally
                {
                    UpImage = null;
                    SideImage = null;
                }
            }
        }

        public async Task StoreShotsAsync(long cartId, long measureId, byte[] upImage, byte[] sideImage)
        {
            string cartPath = Path.Combine(_appSettings.ImageStore, cartId.ToString());
            Directory.CreateDirectory(cartPath);
            string pathUp = Path.Combine(cartPath, $"{measureId}-up.jpg");
            string pathSide = Path.Combine(cartPath, $"{measureId}-side.jpg");

            await File.WriteAllBytesAsync(pathUp, upImage);
            await File.WriteAllBytesAsync(pathSide, sideImage);
        }

        public Task<byte[]> GetShotAsync(long cartId, long measureId, string side)
        {
            string path = Path.Combine(_appSettings.ImageStore, cartId.ToString(), $"{measureId}-{side}.jpg");
            return File.ReadAllBytesAsync(path);
        }

        /// <summary>
        /// Рассчитыввает уровень качества сырья (1 - хорошее, 2 - среднее, 3 - удовлтеоврительное, 4 - плохое)
        /// </summary>
        /// <param name="quality"></param>
        /// <returns></returns>
        public int CalculateQualityLevel(int quality)
        {
            if (quality >= _appSettings.QualityGood)
                return 1;
            else if (quality >= _appSettings.QualityNormal)
                return 2;
            else if (quality >= _appSettings.QualityLow)
                return 3;
            else return 4;
        }

        /// <summary>
        /// Обработчик изображений с камеры сбоку
        /// </summary>
        /// <param name="image">изображение</param>
        private string ProcessSideImage(byte[] image) =>
            NumberRecognition.Execute(image);

        /// <summary>
        /// Обработчик изображений сбоку
        /// </summary>
        /// <param name="image">изображение</param>
        private int ProcessUpImage(byte[] image) =>
            QualityCheck.Execute(image);

    }
}
