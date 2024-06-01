using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private EmployeeService employeeService;
        private DatabaseContext databaseContext;
        public EmployeeController(EmployeeService employeeService,DatabaseContext databaseContext)
        {
            this.employeeService = employeeService;
            this.databaseContext = databaseContext; 
        }
        [HttpPut("UpdateEmployee/{id}")]
        [Produces("application/json")]
        public IActionResult UpdateEmployee(int id, [FromBody] UpdateEmployee updateEmployee)
        {
            try
            {
                if(databaseContext.Employees.Any(d=>d.FullName == updateEmployee.FullName && d.Id!=id)) {
                    return BadRequest(new { message = "Full Name already Exist" });
                }
                if(databaseContext.Employees.Any(d=>d.Email==updateEmployee.Email && d.Id!=id)) { 
                return BadRequest(new { message = "Email already Exist" });
                }
                if(databaseContext.Employees.Any(d=>d.Phone==updateEmployee.Phone && d.Id!=id))
                {
                    return BadRequest(new { message = "Phone Already Exist" });
                }
                return Ok(new
                {
                    result = employeeService.UpdateEmployee(id, updateEmployee)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("ResetPassword/{id}")]
        [Produces("application/json")]
        public IActionResult ResetPassword(int id)
        {
            try
            {
                return Ok(new
                {
                    result = employeeService.ResetPasswordEmployee(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddEmployee")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddEmployee([FromBody]  AddEmployee addEmployee)
        {
            try
            {
                if(databaseContext.Employees.Any(d=>d.FullName==addEmployee.FullName))
                {
                    return BadRequest(new { message = "Full Name already Exist" });
                }
                if (databaseContext.Employees.Any(d => d.Email == addEmployee.Email))
                {
                    return BadRequest(new { message = "Email already Exist" });
                }
                if (databaseContext.Employees.Any(d => d.IdentityCode == addEmployee.IdentityCode))
                {
                    return BadRequest(new { message = "Identity Code Already Exist" });
                }
                if (databaseContext.Employees.Any(d => d.Phone == addEmployee.Phone))
                {
                    return BadRequest(new { message = "Phone Already Exist" });
                }
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
        [HttpGet("GetEmployee/{IdShowRoom}")]
        public async Task<IActionResult> GetEmployee(int IdShowRoom)
        {
            try
            {
                return Ok(employeeService.GetEmployee(IdShowRoom));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("TotalEmployee/{role}")]
        public async Task<IActionResult> TotalEmployee(string role)
        {
            try
            {
                return Ok(await employeeService.CountEmployee(role));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("FindById/{id}")]
        public IActionResult FindById(int id)
        {
            try
            {
                return Ok(employeeService.FindByID(id));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet("ShowContract/{id}")]
        public async Task<IActionResult> ShowContract(int id)
        {
            try
            {
                return Ok(employeeService.ShowContract(id));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
