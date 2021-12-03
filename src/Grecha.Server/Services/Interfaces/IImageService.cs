using System.Threading.Tasks;

namespace grechaserver.Services.Interfaces
{
    /// <summary>
    /// Интерфейс сервиса оценки качества сырья
    /// </summary>
    public interface IQualityMeasureService
    {
        /// <summary>
        /// Обработчик изображений с камер
        /// </summary>
        /// <param name="side">сторона камеры</param>
        /// <param name="image">изображение</param>
        /// <returns>результат обработки</returns>
        Task ProcessImage(int line, string side, byte[] image);
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
        /// <returns>изображение</returns>
        Task<byte[]> GetShotAsync(long cartId, long measureId, string side);
        /// <summary>
        /// Считает уровень количества в зависимости от качества
        /// </summary>
        /// <param name="quality">качество из модуля оценки качества сырья</param>
        int CalculateQualityLevel(int quality);
    }
}
