using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private AccountService _accountService;
        private server.Models.DatabaseContext DatabaseContext;
        public AccountController(AccountService accountService,server.Models.DatabaseContext databaseContext)
        {
            _accountService = accountService;
            DatabaseContext = databaseContext;
        }
        [HttpGet("ShowEmployee/{id}")]
        public IActionResult ShowEmployee(int id)
        {
            try
            {
                return Ok(_accountService.ShowEmployee(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateProfile/{id}")]
        [Consumes("application/json")]
        public IActionResult UpdateProfile(int id,[FromBody]EditEmployee editEmployee)
        {
            if(DatabaseContext.Employees.Any(d=>d.Role== "Employee" && d.Id!=id && d.FullName == editEmployee.FullName))
            {
                return BadRequest(new { message = "Full Name already Exist" });
            }
            if(DatabaseContext.Employees.Any(d=>d.Role=="Employee" && d.Id!=id && d.Email==editEmployee.Email))
            {
                return BadRequest(new { message = "Email already Exist" });
            }
            if(DatabaseContext.Employees.Any(d=>d.Role=="Employee" && d.Id!=id && d.Address == editEmployee.Address))
            {
                return BadRequest(new { message = "Address already Exist" });
            }
            if(DatabaseContext.Employees.Any(d=>d.Role=="Employee" && d.Id!=id && d.IdentityCode == editEmployee.IdentityCode))
            {
                return BadRequest(new { message = "Identity Code already Exist" });
            }
            try
            {
                return Ok(new
                {
                    result = _accountService.UpdateEmployee(id, editEmployee)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPost("LoginAccount/{Email}/{Password}")]
        public IActionResult LoginAccount(string Email, string Password)
        {
            try
            {
                return Ok(_accountService.Login(Email,Password));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
