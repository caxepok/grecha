using Grecha.Server.Models.API;
using Grecha.Server.Services.Interfaces;
using grechaserver.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Grecha.Server.Services
{
    /// <summary>
    /// Сервис для симуляции поступающих данных на второй линии
    /// Для демо фронта при отключенных камерах на публичном сервере
    /// </summary>
    public class SimulationService : BackgroundService
    {
        private readonly Random _random = new Random();  
        private readonly ILogger _logger;
        private readonly IChannelWriterService<MeasureInfo> _channelWriterService;
        private readonly IServiceProvider _serviceProvider;

        public SimulationService(ILogger<SimulationService> logger, IServiceProvider serviceProvider, IChannelWriterService<MeasureInfo> channelWriterService)
        {
            _logger = logger;
            _channelWriterService = channelWriterService;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var imageService  = scope.ServiceProvider.GetRequiredService<IImageService>();

            string cartNumber = _random.Next(10000000, 99999999).ToString();
            int counter = 0;

            while (!stoppingToken.IsCancellationRequested)
            {
                // каждые 10 измерений генерим новый вагон
                if (counter == 5)
                {
                    cartNumber = _random.Next(10000000, 99999999).ToString();
                    counter = 0;
                }

                try
                {
                    int quality = _random.Next(50, 100);
                    MeasureInfo measureInfo = new MeasureInfo()
                    {
                        CartId = 0,
                        LineNumber = 2, // симуляция работы на второй линии
                        CartNumber = cartNumber,
                        Quality = quality,
                        QualityLevel = imageService.CalculateQualityLevel(quality)
                    };
                    _channelWriterService.WriteToChannel(measureInfo);
                    _logger.LogInformation($"Simulation event written, cart: {measureInfo.CartNumber} quality: {measureInfo.Quality}");

                }
                catch (Exception ex)
                {
                    _logger.LogInformation(ex, "Failed to write to channel");
                }
                counter++;
                await Task.Delay(5000, stoppingToken).ContinueWith((t) => { });
            }
        }
    }
}
