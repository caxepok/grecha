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
        private readonly IQualityMeasureService _imageService;

        public ImageController(ILogger<ImageController> logger, IQualityMeasureService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        /// <summary>
        /// Принимает изображение на обработку с камер
        /// </summary>
        /// <param name="side">идентификатор камеры</param>
        /// <param name="data">данные</param>
        [HttpPost("")]
        public async Task<IActionResult> ProcessImage([FromQuery] string side, [FromBody] byte[] data)
        {
            // номер линии, где установлены камеры захардкодим тут
            int line = 1;
            await _imageService.ProcessImage(line, side, data);
            return Ok();
        }
    }
}
