using Grecha.Server.Models.API;
using Grecha.Server.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace Grecha.Server.Hubs
{
    public class ClientHub : Hub
    {
        public readonly IChannelWriterService<ShotInfo> _channelWriterService;

        public ClientHub(IChannelWriterService<ShotInfo> channelWriterService)
        {
            _channelWriterService = channelWriterService;
        }

        public ChannelReader<ShotInfo> Shots(CancellationToken cancellationToken)
        {
            cancellationToken.Register(() => _channelWriterService.UnregisterConnection(Context.ConnectionId));
            Context.ConnectionAborted.Register(() => _channelWriterService.UnregisterConnection(Context.ConnectionId));

            var channelReader = Channel.CreateUnbounded<ShotInfo>();

            _channelWriterService.RegisterConnection(Context.ConnectionId, channelReader.Writer);
            return channelReader;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _channelWriterService.UnregisterConnection(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
