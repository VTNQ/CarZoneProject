using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : Controller
    {
        private CountriesService countriesService;
        private DatabaseContext databaseContext;
        public CountriesController(CountriesService countriesService, DatabaseContext databaseContext)
        {
            this.countriesService = countriesService;
            this.databaseContext = databaseContext;
        }
       
        
        [HttpPost("AddCountries")]
        [Produces("application/json")]
       
        public IActionResult AddCountries([FromForm] AddCountries addCountries)
        {
            try
            {
                if (databaseContext.Countries.Any(d => d.Name == addCountries.Name))
                {
                    return BadRequest(new { message = "Name already Exist" });
                }
                
                return Ok(new
                {
                    result = countriesService.createCountries(addCountries)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowCountry")]
        public IActionResult ShowCountry()
        {
            try
            {
                return Ok(countriesService.ShowCountries());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteCountry/{id}")]
        [Produces("application/json")]
        public IActionResult DeleteCountry(int id)
        {
            try
            {   
                return Ok(new
                {
                    result = countriesService.DeleteCountries(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
