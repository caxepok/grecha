using Grecha.OpenCV;
using Grecha.Server.Models.API;
using Grecha.Server.Services.Interfaces;
using grechaserver.Infrastructure;
using grechaserver.Services.Interfaces;
using Microsoft.Extensions.Logging;
using System;

namespace grechaserver.Services
{
    /// <inheritdoc cref="IImageService"/>
    public class ImageService : IImageService
    {
        private readonly ILogger _logger;
        private readonly GrechaDBContext _dashDBContext;
        private readonly IChannelWriterService<ShotInfo> _channelWriterService;

        /// <summary>
        /// последнее изображение сверху
        /// </summary>
        private static byte[] UpImage;
        /// <summary>
        /// Последнее изображение сбоку
        /// </summary>
        private static byte[] SideImage;
        /// <summary>
        /// Текущий номер тележки
        /// </summary>
        private static string CartNumber;
        private static int Quality;

        public ImageService(ILogger<ImageService> logger, IChannelWriterService<ShotInfo> channelWriterService, GrechaDBContext grechaDBContext)
        {
            _logger = logger;
            _dashDBContext = grechaDBContext;
            _channelWriterService = channelWriterService;
        }

        public ImageProcessingResult ProcessImage(string side, byte[] image)
        {
            switch(side)
            {
                case "up":
                    ProcessUpImage(image);
                    break;
                case "side":
                    ProcessSideImage(image);
                    break;
            }

            return new ImageProcessingResult();
        }

        /// <summary>
        /// Обработчик изображений с камеры сбоку
        /// </summary>
        /// <param name="image">изображение</param>
        private void ProcessSideImage(byte[] image)
        {
            SideImage = image;
            string text = NumberRecognition.Execute(image);
            // дополнительно проверим что циферки - 10 чисел
            if (!String.IsNullOrWhiteSpace(text) && text.Length == 10)
            {
                CartNumber = text;
                _channelWriterService.WriteToChannel(new ShotInfo() { CartNumber = CartNumber, Quality = Quality });
            }
        }

        /// <summary>
        /// Обработчик изображений сбоку
        /// </summary>
        /// <param name="image">изображение</param>
        private void ProcessUpImage(byte[] image)
        {
            UpImage = image;
            Quality = QualityCheck.Execute(image);
            _channelWriterService.WriteToChannel(new ShotInfo() { CartNumber = CartNumber, Quality = Quality });
        }
    }
}
