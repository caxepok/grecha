using Grecha.Server.Models.API;

namespace grechaserver.Services.Interfaces
{
    /// <summary>
    /// Интерфейс сервиса аналитики
    /// </summary>
    public interface IImageService
    {
        /// <summary>
        /// Обработчик изображений с камер
        /// </summary>
        /// <param name="side">сторона камеры</param>
        /// <param name="image">изображение</param>
        /// <returns>результат обработки</returns>
        ImageProcessingResult ProcessImage(string side, byte[] image);
    }
}
