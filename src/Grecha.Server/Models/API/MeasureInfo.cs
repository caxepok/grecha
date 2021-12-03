using MessagePack;

namespace Grecha.Server.Models.API
{
    /// <summary>
    /// Данные измерения
    /// </summary>
    [MessagePackObject]
    public class MeasureInfo
    {
        /// <summary>
        /// Идентификатор вагона
        /// </summary>
        public long CartId {get;set;}
        /// <summary>
        /// Идентификтаор измерения
        /// </summary>
        public long MeasureId {get;set;}
        /// <summary>
        /// Идентификатор линии
        /// </summary>
        public int LineNumber { get; set; }
        /// <summary>
        /// Номер вагона
        /// </summary>
        public string CartNumber { get; set; }
        /// <summary>
        /// Название поставщика
        /// </summary>
        public string SupplierName { get; set; }
        /// <summary>
        /// Качество сырья
        /// </summary>
        public int Quality { get; set; }
        /// <summary>
        /// Уровень качаства (1 - хорошее, 2 - удовлетворительное, 3 - низкое, 4 - неудовлетворительное)
        /// </summary>
        public int QualityLevel { get; set; }
        /// <summary>
        /// Вес вагона
        /// </summary>
        public int Weight { get; set; }
    }
}
