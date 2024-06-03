using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private CustomerService customerService;
        private DatabaseContext databaseContext;
        public CustomerController(CustomerService customerService,DatabaseContext databaseContext)
        {
            this.customerService = customerService;
            this.databaseContext = databaseContext;
        }
        [HttpGet("CountCustomer")]
        public async Task<IActionResult> CountCustomer()
        {
            try
            {
                return Ok(await customerService.TotalCustomer());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateCustomer/{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateCustomer(int id,[FromBody]UpdateCustomer updateCustomer)
        {
            try
            {
                if(databaseContext.Customers.Any(d=>d.FullName==updateCustomer.FullName && d.Id!=id)) {
                    return BadRequest(new { message = "Full Name already Exist" });
                }
                if(databaseContext.Customers.Any(d=>d.Email==updateCustomer.Email && d.Id!=id))
                {
                    return BadRequest(new { message = "Email already Exist" });
                }
                if(databaseContext.Customers.Any(d=>d.Phone==updateCustomer.Phone && d.Id!=id))
                {
                    return BadRequest(new { message = "Phone already Exist" });
                }
                return Ok(new
                {
                    result = customerService.UpdateCustomer(id, updateCustomer)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("ShowCustomer")]
        public async Task<IActionResult> ShowCustomer()
        {
            try
            {
                return Ok(customerService.ShowCustomer());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddCustomer")]
        [Produces("application/json")]

        public async Task<IActionResult> AddCustomer([FromForm]  AddCustomer addCustomer)
        {
            try
            {
                if (databaseContext.Customers.Any(d => d.FullName == addCustomer.FullName))
                {
                    return BadRequest(new { message = "Full Name already Exist" });
                }
                if(databaseContext.Customers.Any(d=>d.Email == addCustomer.Email))
                {
                    return BadRequest(new { message = "Email already Exists" });
                }
                if(databaseContext.Customers.Any(d=>d.IndentityCode== addCustomer.IndentityCode))
                {
                    return BadRequest(new { message = "Indentity Code already Exists" });
                }
                return Ok(new
                {
                    result = customerService.AddCustomer(addCustomer)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
