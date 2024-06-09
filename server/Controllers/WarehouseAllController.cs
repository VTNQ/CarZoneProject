using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseAllController : Controller
    {
        private DatabaseContext databaseContext;
        private WarehouseService warehouseService;
        public WarehouseAllController(DatabaseContext databaseContext, WarehouseService warehouseService)
        {
            this.databaseContext = databaseContext;
            this.warehouseService = warehouseService;
        }
        [HttpPost("addWarehouse")]
        [Produces("application/json")]
        public IActionResult addWarehouse(AddWarehouse addWarehouse)
        {
            try
            {
                if (databaseContext.Warehouses.Any(c => c.Name == addWarehouse.Name))
                {
                    return BadRequest(new { message = "name has already exist" });
                }
                return Ok(new
                {
                    result = warehouseService.addWarehouse(addWarehouse)
                });
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getWarehouse")]
        public IActionResult getWarehouse()
        {
            try
            {
                return Ok(warehouseService.getWarehouse());
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("addCarIntoWarehouse")]
        [Produces("application/json")]
        public IActionResult addCarIntoWarehouse([FromForm] AddCarIntoWarehouse addCarIntoWarehouse)
        {
            try
            {
                if(databaseContext.SubWarehouseCars.Where(d=>d.IdWarehouse == addCarIntoWarehouse.IdWarehouse).Any(c=>c.IdCar == addCarIntoWarehouse.IdCar))
                {
                    return BadRequest(new{ message = "car has aleady exist in this warehouse"});
                }
                return Ok(new
                {
                    result = warehouseService.addCarIntoWarehouse(addCarIntoWarehouse)
                });
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("getCarIntoWarehouse/{idWarehouse}")]
        public IActionResult getCarFromWarehouse(int idWarehouse)
        {
            try
            {
                return Ok(warehouseService.getCarFromWarehouse(idWarehouse));
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
