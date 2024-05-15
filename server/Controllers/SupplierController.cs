using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierService supplierService;
        public SupplierController(SupplierService supplierService)
        {
            this.supplierService = supplierService;
        }
        [HttpPost("AddSupplier")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult AddSupplier([FromBody] AddSupplier addSupplier)
        {
            try
            {
                return Ok(new
                {
                    result = supplierService.AddSupplier(addSupplier)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteSupplier/{id}")]
        public IActionResult DeleteSupplier(int id)
        {
            try
            {
                return Ok(new
                {
                    result = supplierService.DeleteSupplier(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateSupplier/{id}")]
        [Produces("application/json")]
        public IActionResult UpdateSupplier(int id, [FromBody] AddSupplier updateSupplier)
        {
            try
            {
                return Ok(new
                {
                    result = supplierService.UpdateSupplier(id, updateSupplier)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowSupplier")]
        public IActionResult ShowSupplier()
        {
            try
            {
                return Ok(supplierService.ShowSupplier());
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
                return Ok(supplierService.ShowCountry());   
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
