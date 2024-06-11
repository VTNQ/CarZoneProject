using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierService supplierService;
        private readonly DatabaseContext databaseContext;
        public SupplierController(SupplierService supplierService,DatabaseContext databaseContext)
        {
            this.supplierService = supplierService;
            this.databaseContext = databaseContext;
        }
        [HttpPost("AddSupplier")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddSupplier([FromBody] AddSupplier addSupplier)
        {
            try
            {
                if(databaseContext.Supliers.Any(d=>d.Name == addSupplier.Name))
                {
                    return BadRequest(new { message = "Name already Exist" });
                }
                if(databaseContext.Supliers.Any(d=>d.Email== addSupplier.Email))
                {

                    return BadRequest(new { message = "Email already Exist" });
                }
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
        [HttpGet("CountSupplier")]
        public async Task<IActionResult> CountSupplier()
        {
            try
            {
                return Ok(await supplierService.TotalSupplier());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteSupplier/{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
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
        public async Task<IActionResult> UpdateSupplier(int id, [FromBody] AddSupplier updateSupplier)
        {
            try
            {
                if(databaseContext.Supliers.Any(d=>d.Email == updateSupplier.Email && d.Id != id))
                {
                    return BadRequest(new { message = "Email already Exist" });
                }
                if(databaseContext.Supliers.Any(d=>d.Name==updateSupplier.Name && d.Id != id))
                {
                    return BadRequest(new { message = "Name already Exist" });
                }
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
        public async Task<IActionResult> ShowSupplier()
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
        public async Task<IActionResult> ShowCountry()
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
