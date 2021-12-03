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

        [HttpGet("{id}/{measureId}/{side}")]
        public async Task<IActionResult> GetMeasureImage(long id, long measureId, string side)
        {
            return File(await _imageService.GetShotAsync(id, measureId, side), "image/jpeg");    
        }
    }
}
