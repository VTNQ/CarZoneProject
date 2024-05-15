using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private CustomerService customerService;
        public CustomerController(CustomerService customerService)
        {
            this.customerService = customerService;
        }
        [HttpPut("UpdateCustomer/{id}")]
        [Produces("application/json")]
        public IActionResult UpdateCustomer(int id,[FromBody]UpdateCustomer updateCustomer)
        {
            try
            {
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
        public IActionResult ShowCustomer()
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

        public IActionResult AddCustomer([FromBody]  AddCustomer addCustomer)
        {
            try
            {
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
