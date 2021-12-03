using System;

namespace Grecha.Server.Models.DB
{
    /// <summary>
    /// Результат измерения качества
    /// </summary>
    public class Measure
    {
        /// <summary>
        /// Идентификаторв
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// Идентификатор вагона
        /// </summary>
        public long CartId { get; set; }
        /// <summary>
        /// Метка времени
        /// </summary>
        public DateTimeOffset Timestamp { get; set; }
        /// <summary>
        /// Качество сырья
        /// </summary>
        public int Quality { get; set; }
        /// <summary>
        /// Текущий вагона
        /// </summary>
        public int Weight { get;set; }

        public virtual Cart Cart { get; set; }

    }
}
