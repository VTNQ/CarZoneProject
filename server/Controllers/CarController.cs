using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : Controller
    {
        private DatabaseContext databaseContext;
        private CarService carService;
        public CarController(DatabaseContext databaseContext,CarService carService)
        {
            this.databaseContext = databaseContext;
            this.carService = carService;
        }
        [HttpGet("TotalCar/{id}")]
        public async Task<IActionResult> TotalCar(int id)
        {
            try
            {
                return Ok(await carService.TotalCar(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateCar/{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateCar(int id, [FromBody]UpdateCar updateCar)
        {
            if(databaseContext.Cars.Any(d=>d.Name==updateCar.Name && d.Id!=id)) {
                return BadRequest(new { message = "name has already exist" });
            }
            try
            {
                return Ok(new
                {
                    result = carService.updateCar(id, updateCar)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteCar/{id}")]

        public async Task<IActionResult> DeleteCar(int id)
        {
            if (databaseContext.DetailOfInOrders.Any(d => d.IdCar == id))
            {
                return BadRequest(new { message = "Cannot delete car in order" });
            }
            if(databaseContext.DetailOfOutOrders.Any(d => d.IdCar == id))
            {
                return BadRequest(new { message = "Cannot delete car out order" });
            }
            if(databaseContext.SubWarehouseCars.Any(d => d.IdCar == id))
            {
                return BadRequest(new { message = "Cannot delete car Sub WareHouse Car" });
            }
            if(databaseContext.SubWarehouseShowrooms.Any(d=>d.IdCar == id))
            {
                return BadRequest(new { message = "Cannot delete car Sub WareHouse ShowRoom Car" });
            }
            try
            {
                return Ok(new
                {
                    result = carService.deleteCar(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("addCar")]
        [Produces("application/json")]
        public IActionResult addCar([FromForm] AddCar addCar)
        {
            try
            {
                if(databaseContext.Cars.Any(c=>c.Name == addCar.Name)) {
                    return BadRequest(new { message = "name has already exist" });
                }
                return Ok(new
                {
                    result = carService.addCar(addCar)
                }) ;
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getCar")]
        public IActionResult getCar()
        {
            try
            {
                return Ok(carService.showCar());
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("findCarById/{id}")]
        public IActionResult findCar(int id) {
            try
            {
                return Ok(carService.findCarById(id));
            }catch (Exception ex)
            {
                return BadRequest($"Could not find {id} car");
            }
        }
    }
}
