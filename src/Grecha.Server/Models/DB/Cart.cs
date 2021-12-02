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
        /// Номер вагона
        /// </summary>
        public string Number { get; set; }
        /// <summary>
        /// Поставщик
        /// </summary>
        public string Supplier { get; set; }

        /// <summary>
        /// Измерения, производимые для этого вагона
        /// </summary>

        public virtual ICollection<Measure> Measures { get; set; }
    }
}
