using Grecha.Server.Models.API;
using Grecha.Server.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Grecha.Server.Hubs
{
    /// <summary>
    /// Хаб для взаимодействия с фронтом в реальном времени
    /// </summary>
    public class ClientHub : Hub
    {
        private readonly ILogger _logger;
        public readonly IChannelWriterService<MeasureInfo> _channelWriterService;

        public ClientHub(ILogger<IChannelWriterService<MeasureInfo>> logger, IChannelWriterService<MeasureInfo> channelWriterService)
        {
            _channelWriterService = channelWriterService;
            _logger = logger;
        }

        /// <summary>
        /// Подписка на события измерений
        /// </summary>
        /// <param name="cancellationToken">токен отмены</param>
        public ChannelReader<MeasureInfo> Measure(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Subscribing client");
            try
            {
                cancellationToken.Register(() => _channelWriterService.UnregisterConnection(Context.ConnectionId));
                Context.ConnectionAborted.Register(() => _channelWriterService.UnregisterConnection(Context.ConnectionId));

                var channelReader = Channel.CreateUnbounded<MeasureInfo>();

                _channelWriterService.RegisterConnection(Context.ConnectionId, channelReader.Writer);
                return channelReader;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to register conneciton");
                throw;
            }
        }

        internal void NotifyClients(MeasureInfo measureInfo)
        {
            Clients.All.SendAsync("Measured", measureInfo);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _channelWriterService.UnregisterConnection(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
