using grechaserver.Infrastructure;
using grechaserver.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace grechaserver.Controllers
{
    /// <summary>
    /// Контроллер для фронта для работы с изображениями
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly GrechaDBContext _grechaDBContext;
        private readonly IImageService _imageService;

        public ImageController(ILogger<ImageController> logger, GrechaDBContext grechaDBContext, IImageService imageService)
        {
            _logger = logger;
            _grechaDBContext = grechaDBContext;
            _imageService = imageService;
        }

        /// <summary>
        /// Принимает изображение на обработку
        /// </summary>
        /// <param name="side">идентификатор камеры</param>
        /// <param name="data">данные</param>
        [HttpPost("")]
        public async Task<IActionResult> ProcessImage([FromQuery]string side, [FromBody] byte[] data)
        {
            var result = _imageService.ProcessImage(side, data);
            return Ok(result);
        }
    }
}
