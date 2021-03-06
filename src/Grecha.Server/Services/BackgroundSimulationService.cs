using Grecha.Server.Hubs;
using Grecha.Server.Models.API;
using Grecha.Server.Models.DB;
using grechaserver.Infrastructure;
using grechaserver.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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
        private readonly IServiceProvider _serviceProvider;
        private readonly IHubContext<ClientHub> _clientHub;

        public SimulationService(ILogger<SimulationService> logger, IServiceProvider serviceProvider, IHubContext<ClientHub> clientHub)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _clientHub = clientHub;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var imageService = scope.ServiceProvider.GetRequiredService<IQualityMeasureService>();
            var dbContext = scope.ServiceProvider.GetRequiredService<GrechaDBContext>();

            List<Supplier> suppliers = await dbContext.Suppliers.ToListAsync();
            string cartNumber = _random.Next(10000000, 99999999).ToString();
            string supplierName = suppliers[_random.Next(0, suppliers.Count)].Name;
            int counter = 1;

            List<int> qualities = new List<int>() { 95, 90, 85, 80, 67, 48 };

            while (!stoppingToken.IsCancellationRequested)
            {
                // каждые 6 измерений генерим новый виртуальный вагон
                if (counter == 7)
                {
                    cartNumber = _random.Next(10000000, 99999999).ToString();
                    supplierName = suppliers[_random.Next(0, suppliers.Count)].Name;
                    counter = 1;
                }

                try
                {
                    int quality = qualities[counter - 1] + _random.Next(0, 4);
                    MeasureInfo measureInfo = new MeasureInfo()
                    {
                        CartId = 0,
                        LineNumber = 2, // симуляция работы на второй линии
                        MeasureId = counter,
                        CartNumber = cartNumber,
                        Quality = quality,
                        QualityLevel = imageService.CalculateQualityLevel(quality),
                        SupplierName = supplierName,
                        Weight = _random.Next(50, 100)
                    };
                    // отправляем уведомление всем подключеным клиентам
                    await _clientHub.Clients.All.SendAsync("Measured", measureInfo);
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
