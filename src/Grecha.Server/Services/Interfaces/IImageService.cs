using Grecha.Server.Models.API;
using System.Threading.Tasks;

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
        Task ProcessImage(string side, byte[] image);
        /// <summary>
        /// Сохраняет изображение в хранилище
        /// </summary>
        /// <param name="cartId">идентификатор вагона</param>
        /// <param name="measureId">идентификатор измерения</param>
        /// <param name="upImage">изображение с верхней камеры</param>
        /// <param name="sideImage">изображение с нижней камеры</param>
        Task StoreShotsAsync(long cartId, long measureId, byte[] upImage, byte[] sideImage);
        /// <summary>
        /// Возвращает сохраннёное изображение
        /// </summary>
        /// <param name="cartId">идентификатор вагона</param>
        /// <param name="measureId">идентификатор измерения</param>
        /// <param name="side">место установки камеры</param>
        /// <returns></returns>
        Task<byte[]> GetShotAsync(long cartId, long measureId, string side);
        int CalculateQualityLevel(int quality);
    }
}
