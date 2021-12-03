using Grecha.Server.Models.API;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Grecha.Server.Hubs
{
    /// <summary>
    /// Хаб для взаимодействия с фронтом в реальном времени
    /// </summary>
    public class ClientHub : Hub
    {
        private readonly ILogger _logger;

        public ClientHub(ILogger<ClientHub> logger)
        {
            _logger = logger;
        }

        internal void NotifyClients(MeasureInfo measureInfo)
        {
            Clients.All.SendAsync("Measured", measureInfo);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
