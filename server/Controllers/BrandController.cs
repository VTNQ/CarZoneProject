using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly BrandService _brandService;
        public BrandController(BrandService brandService)
        {
            _brandService = brandService;
        }
        [HttpGet("GetCountry")]
        public IActionResult GetCountry()
        {
            try
            {
                return Ok(_brandService.GetCountry());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddBrand")]
        [Produces("application/json")]
        public IActionResult AddBrand([FromForm] AddBrand addBrand)
        {
            try
            {
                return Ok(new
                {
                    result = _brandService.AddBrand(addBrand)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
