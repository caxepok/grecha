using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace grechaserver.Infrastructure
{
    /// <summary>
    /// Настройки приложения
    /// </summary>
    public class AppSettings
    {
        /// <summary>
        /// Путь к хранилищу изображений
        /// </summary>
        public string ImageStore { get; set; }
        public int QualityGood { get; set; } = 90;
        public int QualityNormal { get; set; } = 80;
        public int QualityLow { get; set; } = 65;
    }
}
