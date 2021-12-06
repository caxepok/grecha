using grechaserver.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Grecha.Server.Controllers
{
    /// <summary>
    /// Контроллер для получения сводных данных для графиков
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class SummaryController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly GrechaDBContext _grechaDBContext;

        public SummaryController(ILogger<SummaryController> logger, GrechaDBContext grechaDBContext)
        {
            _logger = logger;
            _grechaDBContext = grechaDBContext;
        }

        /// <summary>
        /// Возвращает сводные данные по качеству сырья за период
        /// </summary>
        [HttpGet("")]
        public async Task<IActionResult> GetSummary(DateTimeOffset from, DateTimeOffset to)
        {
            return Ok(_grechaDBContext.Summaries.Where(_ => _.Timestamp >= from && _.Timestamp < to));
        }
    }
}
