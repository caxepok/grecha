using grechaserver.Infrastructure;
using grechaserver.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace grechaserver.Controllers
{
    /// <summary>
    /// Контроллер для фронта\камер\планшета для работы с изображениями и данными вагонов
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly GrechaDBContext _grechaDBContext;
        private readonly IQualityMeasureService _imageService;

        public CartController(ILogger<ImageController> logger, GrechaDBContext grechaDBContext, IQualityMeasureService imageService)
        {
            _logger = logger;
            _grechaDBContext = grechaDBContext;
            _imageService = imageService;
        }

        /// <summary>
        /// Возвращает вагоны на всех линиях
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetCarts()
        {
            return Ok(_grechaDBContext.Carts.Include(_ => _.Supplier));
        }

        /// <summary>
        /// Возвращает детальные данные по вагону
        /// </summary>
        /// <param name="id">идентификатор вагона</param>
        /// <returns>данные по вагону</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart(long id)
        {
            return Ok(await _grechaDBContext.Carts
                .Include(_ => _.Measures)
                .Include(_ => _.Supplier)
                .SingleOrDefaultAsync(_ => _.Id == id));
        }

        /// <summary>
        /// Фотографию оценки качества сырья
        /// </summary>
        /// <param name="id">идентификатор вагона</param>
        /// <param name="measureId">идентификатор записи оценки</param>
        /// <param name="side">место установки камеры (up, side)</param>
        /// <returns>фотография</returns>
        [HttpGet("{id}/{measureId}/{side}")]
        public async Task<IActionResult> GetMeasureImage(long id, long measureId, string side)
        {
            return File(await _imageService.GetShotAsync(id, measureId, side), "image/jpeg");    
        }
    }
}
