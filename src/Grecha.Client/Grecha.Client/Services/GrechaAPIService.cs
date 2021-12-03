using System.Net.Http;
using System.Threading.Tasks;

namespace Grecha.Client.Services
{
    public interface IGrechaAPIService
    {
        Task PostImageAsync(byte[] data);
    }

    public class GrechaAPIService : IGrechaAPIService
    {
        /// <summary>
        /// Урл сервера, куда отправлять картинки, в продакшене обработка должна быть прямо тут
        /// </summary>
        private readonly static string ServerUrl = "http://192.168.137.1:5000";
        /// <summary>
        /// Место закрепления камеры
        /// </summary>
        private readonly static string CameraSide = "side";

        private readonly HttpClient httpClient = new HttpClient();

        public async Task PostImageAsync(byte[] data)
        {
            ByteArrayContent content = new ByteArrayContent(data);
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            var result = await httpClient.PostAsync($"{ServerUrl}/image?side={CameraSide}", content);

            if (!result.IsSuccessStatusCode)
                return;
        }
    }
}
