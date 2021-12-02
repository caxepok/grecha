namespace Grecha.Server.Models.API
{
    /// <summary>
    /// Данные снимка
    /// </summary>
    public class ShotInfo
    {
        /// <summary>
        /// Номер вагона
        /// </summary>
        public string CartNumber { get; set; }
        /// <summary>
        /// Качество сырья
        /// </summary>
        public int Quality { get; set; }
        /// <summary>
        /// Уровень качаства (1 - хорошее, 2 - удовлетворительное, 3 - низкое, 4 - неудовлетворительное)
        /// </summary>
        public int QualityLevel { get; set; }
    }
}
