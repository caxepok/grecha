using Grecha.Server.Services.Interfaces;
using System;

namespace Grecha.Server.Services
{
    /// <summary>
    /// Сервис интеграции с весами вагонов
    /// </summary>
    public class WeightsIntegrationService : IWeightsIntegrationService
    {
        /// <summary>
        /// Симулирует взвешивание вагона на линии
        /// </summary>
        /// <param name="lineNumber">номер линии</param>
        /// <returns>вес вагона с сырьём</returns>
        public int MeasureWeight(int lineNumber)
        {
            Random random = new Random();
            return random.Next(50, 120);
        }
    }
}
