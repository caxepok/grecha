using grechaserver.Infrastructure;
using grechaserver.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace grechaserver.Controllers
{
    /// <summary>
    /// Контроллер для фронта для работы с изображениями
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly GrechaDBContext _grechaDBContext;
        private readonly IImageService _imageService;

        public CartController(ILogger<ImageController> logger, GrechaDBContext grechaDBContext, IImageService imageService)
        {
            _logger = logger;
            _grechaDBContext = grechaDBContext;
            _imageService = imageService;
        }

        /// <summary>
        /// Возвращает список составов, которые были учтены системой
        /// </summary>
        /// <param name="side">идентификатор камеры</param>
        /// <param name="data">данные</param>
        [HttpPost("")]
        public async Task<IActionResult> ProcessImage([FromQuery]string side, [FromBody] byte[] data)
        {
            var result = _imageService.ProcessImage(side, data);
            return Ok(result);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetCarts()
        {
            return Ok(_grechaDBContext.Carts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart(long id)
        {
            return Ok(_grechaDBContext.Carts.Include(_ => _.Measures).SingleOrDefaultAsync(_ => _.Id == id));
        }
    }
}
