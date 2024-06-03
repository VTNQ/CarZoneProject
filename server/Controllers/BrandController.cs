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
        public async Task<IActionResult> UpdateBrand(int id, [FromBody] UpdateBrand updateBrand)
        {
            try
            {
                if(db.Brands.Any(d=>d.Name == updateBrand.Name && d.Id!=id)) {
                    return BadRequest(new { message = "Name already Exist" });
                }
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
        public async Task<IActionResult> DeleteBrand(int id)
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
        public async Task<IActionResult> GetBrand()
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
        [HttpGet("TotalBrand")]
        public async Task<IActionResult> TotalBrand()
        {
            try
            {
                return Ok(await _brandService.TotalBrand());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetCountry")]
        public async Task<IActionResult> GetCountry()
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
                if(db.Brands.Any(d=>d.Name == addBrand.Name))
                {
                    return BadRequest(new { message = "Name already Exist" });
                }
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
