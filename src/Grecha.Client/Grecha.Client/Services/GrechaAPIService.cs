using Grecha.Client.Models;
using Newtonsoft.Json;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Grecha.Client.Services
{
    public interface IGrechaAPIService
    {
        Task<ImageProcessingResult> PostImageAsync(byte[] data);
    }

    public class GrechaAPIService : IGrechaAPIService
    {
        private readonly static string ServerUrl = "http://192.168.137.1:5000";
        private readonly HttpClient httpClient = new HttpClient();

        public async Task<ImageProcessingResult> PostImageAsync(byte[] data)
        {
            ByteArrayContent content = new ByteArrayContent(data);
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            var result = await httpClient.PostAsync($"{ServerUrl}/image?side=side", content);
            
            if (!result.IsSuccessStatusCode)
                return new ImageProcessingResult();

            string json = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ImageProcessingResult>(json);
        }
    }
}
