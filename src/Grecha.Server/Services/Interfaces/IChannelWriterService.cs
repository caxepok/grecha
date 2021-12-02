using System.Threading.Channels;

namespace Grecha.Server.Services.Interfaces
{
    public interface IChannelWriterService<T>
    {
        void RegisterConnection(string connectionId, ChannelWriter<T> writer);
        void UnregisterConnection(string connectionId);
        void WriteToChannel(T evt);
    }
}
