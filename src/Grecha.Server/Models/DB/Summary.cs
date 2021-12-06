using System;

namespace Grecha.Server.Models.DB
{
    /// <summary>
    /// Суммарные данные
    /// </summary>
    public class Summary
    {
        /// <summary>
        /// Идентификатор записи
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// Момент времени
        /// </summary>
        public DateTimeOffset Timestamp { get; set; }
        /// <summary>
        /// Значение в момент
        /// </summary>
        public decimal Value { get; set; }
    }
}
