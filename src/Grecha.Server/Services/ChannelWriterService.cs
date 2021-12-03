using Grecha.Server.Services.Interfaces;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Threading.Channels;

namespace Grecha.Server.Services
{
    /// <inheritdoc cref="IChannelWriterService{T}"/>
    public class ChannelWriterService<T> : IChannelWriterService<T>
    {
        private readonly ILogger _logger;
        private readonly ConcurrentDictionary<string, ChannelWriter<T>> _channels;

        public ChannelWriterService(ILogger<ChannelWriterService<T>> logger)
        {
            _logger = logger;
            _channels = new ConcurrentDictionary<string, ChannelWriter<T>>();
        }

        public void RegisterConnection(string connectionId, ChannelWriter<T> writer)
        {
            _logger.LogInformation("Registered connection");

            _channels.AddOrUpdate(connectionId, writer, (cl, cw) =>
                {
                    cw?.Complete();
                    return writer;
                });
        }

        public void UnregisterConnection(string connectionId)
        {
            _channels.TryRemove(connectionId, out var channelWriter);
            channelWriter?.Complete();
        }

        public void WriteToChannel(T evt)
        {
            _logger.LogInformation($"Channels count: {_channels.Count}");

            foreach (var channel in _channels)
            {
                _logger.LogInformation("Written to channel");
                channel.Value.TryWrite(evt);
            }
        }
    }
}
