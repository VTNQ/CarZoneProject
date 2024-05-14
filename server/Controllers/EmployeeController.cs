using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private EmployeeService employeeService;
        public EmployeeController(EmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }
        [HttpPost("AddEmployee")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult AddEmployee(AddEmployee addEmployee)
        {
            try
            {
                return Ok(new
                {
                    result = employeeService.CreateEmployee(addEmployee)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
