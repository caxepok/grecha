using Grecha.Server.Services.Interfaces;
using System.Collections.Concurrent;
using System.Threading.Channels;

namespace Grecha.Server.Services
{
    /// <inheritdoc cref="IChannelWriterService{T}"/>
    public class ChannelWriterService<T> : IChannelWriterService<T>
    {
        private readonly ConcurrentDictionary<string, ChannelWriter<T>> _channels;

        public ChannelWriterService()
        {
            _channels = new ConcurrentDictionary<string, ChannelWriter<T>>();
        }

        public void RegisterConnection(string connectionId, ChannelWriter<T> writer)
        {
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
            foreach (var channel in _channels)
                channel.Value.TryWrite(evt);
        }
    }
}
