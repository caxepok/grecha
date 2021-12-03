using grechaserver.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace Grecha.Server.Controllers
{
    /// <summary>
    /// Контроллер для получения данных аналитики по поставщикам
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly GrechaDBContext _grechaDBContext;

        public SupplierController(ILogger<SupplierController> logger, GrechaDBContext grechaDBContext)
        {
            _logger = logger;
            _grechaDBContext = grechaDBContext;
        }

        /// <summary>
        /// Возвращает вагоны поставщика с данными оценки качества
        /// </summary>
        [HttpGet("{id}/carts")]
        public async Task<IActionResult> GetSupplierInfo(long id)
        {
            return Ok(_grechaDBContext.Carts.Include(_ => _.Measures).Where(_ => _.SupplierId == id));
        }
    }
}
