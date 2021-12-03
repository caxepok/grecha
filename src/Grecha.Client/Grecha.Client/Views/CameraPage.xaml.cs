using Grecha.Client.ViewModels;
using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Grecha.Client.Views
{
    public partial class CameraPage : ContentPage
    {
        private readonly CancellationTokenSource cts = new CancellationTokenSource ();
        private readonly CameraViewModel _viewModel;
        private bool ProcessPhotos = false;

        public CameraPage()
        {
            InitializeComponent();

            _viewModel = (CameraViewModel)BindingContext;   
            
            Task shutter = DoWorkAsync(cts.Token);
        }

        private async Task DoWorkAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    await Task.Delay(5000);
                    if(ProcessPhotos)
                        cameraView.Shutter();
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Exception occured: {ex}");
                }
            }
        }

        private async void cameraView_MediaCaptured(object sender, Xamarin.CommunityToolkit.UI.Views.MediaCapturedEventArgs e)
        {
            byte[] photo = e.ImageData;
            Debug.Write($"Camera image, length: {photo.Length}");
            await _viewModel.ProcessImage(photo);
        }

        private void cameraView_OnAvailable(object sender, bool e)
        {

        }

        private void btnStartShutter_Clicked(object sender, EventArgs e)
        {
            if (ProcessPhotos)
            {
                btnStartShutter.Text = "Start";
                btnStartShutter.BackgroundColor = Color.LightGreen;
            }
            else
            {
                btnStartShutter.Text = "Stop";
                btnStartShutter.BackgroundColor = Color.Salmon;
            }
            ProcessPhotos = !ProcessPhotos;
        }
    }
}