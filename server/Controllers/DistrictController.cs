using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;
using System.Runtime.CompilerServices;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictController : Controller
    {
        private DatabaseContext databaseContext;
        private DistrictService districtService;
        public DistrictController(DatabaseContext databaseContext, DistrictService districtService)
        {
            this.databaseContext = databaseContext;
            this.districtService = districtService;
        }
        //function to add new District to database
        [HttpPost("addDistrict")]
        [Produces("application/json")]
        public IActionResult AddDistrict([FromBody] AddDistrict addDistrict)
        {
            try
            {
                if (databaseContext.Districts.Any(d => d.Name == addDistrict.Name))
                {
                    return BadRequest(new { message = "name has already exist" });
                }
                return Ok(new
                {
                    result = districtService.createDistrict(addDistrict)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        
        [HttpDelete("deleteDistrict/{id}")]
        public IActionResult DeleteDistrict(int id)
        {
            try
            {
                return Ok(new
                {
                    result = districtService.deleteDistrict(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
         
        [HttpGet("showDistrict")]
        public IActionResult ShowDistrict()
        {
            try
            {
                return Ok(districtService.showDistrict());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("findDistrictByCity/{id}")]
        public IActionResult findDistrictByCity(int id)
        {
            try
            {
                return Ok(districtService.findDistrictByCity(id));
            }catch
            {
                return BadRequest();
            }
        }

    }
}
