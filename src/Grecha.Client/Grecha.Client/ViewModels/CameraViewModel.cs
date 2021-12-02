using Grecha.Client.Services;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace Grecha.Client.ViewModels
{
    public class CameraViewModel : BaseViewModel
    {
        private readonly IGrechaAPIService _grechaService;

        public CameraViewModel()
        {
            Title = "Grecha";

            _grechaService = new GrechaAPIService();
        }

        public async Task ProcessImage(byte[] data)
        {
            try
            {
                var result = await _grechaService.PostImageAsync(data);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception occured on image processing: {ex}");
            }
        }

        public ICommand OpenWebCommand { get; } = new Command(async () => await Browser.OpenAsync("https://aka.ms/xamarin-quickstart"));
    }
}