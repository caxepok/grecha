using System.Collections.Generic;

namespace Grecha.Server.Models.DB
{
    /// <summary>
    /// Поставщик
    /// </summary>
    public class Supplier
    {
        /// <summary>
        /// Идентификатор поставщика
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// Название поставщика
        /// </summary>
        public string Name { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
    }
}
