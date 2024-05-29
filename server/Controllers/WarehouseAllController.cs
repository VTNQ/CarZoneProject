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
                if(databaseContext.Warehouses.Any(c=>c.Name == addWarehouse.Name))
                {
                    return BadRequest(new { message = "name has already exist"});
                }
                return Ok(new
                {
                    result = warehouseService.addWarehouse(addWarehouse)
                }) ;
            }catch (Exception ex)
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
            }catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }
    }
}
