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
    /// <inheritdoc cref="IQualityMeasureService"/>
    public class ImageService : IQualityMeasureService
    {
        private readonly ILogger _logger;
        private readonly AppSettings _appSettings;
        private readonly GrechaDBContext _grechaDBContext;
        private readonly IHubContext<ClientHub> _clientHub;
        private readonly IWeightsIntegrationService _weightsIntegrationService;

        /// <summary>
        /// последнее изображение сверху
        /// </summary>
        private static byte[] UpImage;
        /// <summary>
        /// Последнее изображение сбоку
        /// </summary>
        private static byte[] SideImage;

        public ImageService(ILogger<ImageService> logger, IOptions<AppSettings> options,
            IHubContext<ClientHub> clientHub, IWeightsIntegrationService weightsIntegrationService, GrechaDBContext grechaDBContext)
        {
            _logger = logger;
            _grechaDBContext = grechaDBContext;
            _appSettings = options.Value;
            _clientHub = clientHub;
            _weightsIntegrationService = weightsIntegrationService;
        }

        public async Task ProcessImage(int line, string side, byte[] image)
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
                    int weight = _weightsIntegrationService.MeasureWeight(line);
                    int quality = ProcessUpImage(upImage);
                    string cartNumber = ProcessSideImage(sideImage);
                    if (cartNumber == String.Empty)
                        return;

                    var cart = _grechaDBContext.Carts.Include(_ => _.Supplier).SingleOrDefault(_ => _.Number == cartNumber);
                    if (cart == null)
                    {
                        // прибыл новый вагон, сохраним его
                        // хардкодим поставщика номер 4 (т.к. пока нет каталога поставщиков-вагонов)
                        cart = new Cart() { Number = cartNumber, Line = line, SupplierId = 4 };    
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
                        QualityLevel = cart.QualityLevel, MeasureId = measure.Id, Weight = weight, SupplierName = cart.Supplier.Name };

                    await _clientHub.Clients.All.SendAsync("Measured", measureInfo);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to process cart quality check");
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
