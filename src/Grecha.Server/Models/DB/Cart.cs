using System.Collections.Generic;

namespace Grecha.Server.Models.DB
{
    /// <summary>
    /// Вагон
    /// </summary>
    public class Cart
    {
        /// <summary>
        /// Идентификтаор
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// Идентификатор поставщика
        /// </summary>
        public long SupplierId { get; set; }
        /// <summary>
        /// Номер вагона
        /// </summary>
        public string Number { get; set; }
        /// <summary>
        /// Номер линии
        /// </summary>
        public int Line { get; set; }
        /// <summary>
        /// Последнее измерение качества
        /// </summary>
        public int Quality { get; set; }
        /// <summary>
        /// Уровнень качества с последнего измерения
        /// </summary>
        public int QualityLevel { get; set; }   

        /// <summary>
        /// Измерения, производимые для этого вагона
        /// </summary>
        public virtual ICollection<Measure> Measures { get; set; }
        /// <summary>
        /// Поставщик, которому принадлежит вагон
        /// </summary>
        public virtual Supplier Supplier { get; set; }  
    }
}
