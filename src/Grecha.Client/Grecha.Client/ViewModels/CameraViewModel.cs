using Grecha.Client.Services;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Grecha.Client.ViewModels
{
    public class CameraViewModel : BaseViewModel
    {
        private readonly IGrechaAPIService _grechaService;

        public CameraViewModel()
        {
            Title = "Grecha Camera";

            _grechaService = new GrechaAPIService();
        }

        public async Task ProcessImage(byte[] data)
        {
            try
            {
                await _grechaService.PostImageAsync(data);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception occured on image processing: {ex}");
            }
        }
    }
}