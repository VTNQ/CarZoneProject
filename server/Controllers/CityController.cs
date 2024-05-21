using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CityController : Controller
    {
        private DatabaseContext databaseContext;
        private CityService cityService;
        public CityController(DatabaseContext databaseContext, CityService cityService)
        {
            this.databaseContext = databaseContext;
            this.cityService = cityService;
        }
        [HttpPost("addCity")]
        [Produces("application/json")]
        public IActionResult AddCity([FromForm]AddCity addCity)
        {
            try
            {
                if(databaseContext.Cities.Any(d=>d.Name == addCity.Name))
                {
                    return BadRequest(new { message = "name has already exist" });
                }
                return Ok(new
                {
                    result = cityService.createCity(addCity)
                }) ;
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("showCity")]
        public IActionResult showCity()
        {
            try
            {

                return Ok(cityService.ShowCity());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("deleteCity/{id}")]
        public IActionResult DeleteCity(int id)
        {
            try
            {
                return Ok(new
                {
                    result = cityService.DeleteCity(id)
                });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //function to find city by id Country
        [HttpGet("findCityByCountry/{id}")]
        public IActionResult findCity(int id) {
            try
            {
                return Ok(cityService.findCityByIdCoutry(id));
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
