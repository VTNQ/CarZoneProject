using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly DatabaseContext db;
        private readonly BrandService _brandService;
        public BrandController(BrandService brandService,DatabaseContext databaseContext)
        {
            _brandService = brandService;
            db = databaseContext;
        }
        [HttpPut("UpdateBrand/{id}")]
        public IActionResult UpdateBrand(int id, [FromBody] UpdateBrand updateBrand)
        {
            try
            {
                return Ok(new
                {
                    result = _brandService.UpdateBrand(id, updateBrand)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteBrand/{id}")]
        public IActionResult DeleteBrand(int id)
        {
            try
            {
                if(db.Models.Any(d=>d.IdBrand == id))
                {
                    return BadRequest(new { message = "Delete Failed" });
                }
                return Ok(new
                {
                    result = _brandService.DeleteBrand(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetBrand")]
        public IActionResult GetBrand()
        {
            try
            {
                return Ok(_brandService.ShowBrand());
            }
            catch
            {
                return BadRequest();
            }
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
