using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> ShowEmployee(int id)
        {
            try
            {
                return Ok(await _accountService.ShowEmployee(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateProfile/{id}")]
        [Consumes("application/json")]
        public async Task<IActionResult> UpdateProfile(int id,[FromBody]EditEmployee editEmployee)
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
        public async Task<IActionResult> LoginAccount(string Email, string Password)
        {
            try
            {
                return Ok(await _accountService.Login(Email,Password,Response));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("addAdmin")]
        [Produces("application/json")]
        public IActionResult addAdmin([FromBody] AddAdmin addAdmin)
        {
            try
            {
                if (DatabaseContext.Employees.Any(c => c.Email == addAdmin.Email && c.IdentityCode == addAdmin.IdentityCode))
                {
                    return BadRequest(new {message = "email or identity code existed"});
                }
                return Ok(new
                {
                    result = _accountService.addAdmin(addAdmin)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }[HttpPost("addWarehouse")]
        [Produces("application/json")]
        public IActionResult addWarehouse([FromBody] AddAccountWarehouse addWarehouse)
        {
            try
            {
                if (DatabaseContext.Employees.Any(c => c.Email == addWarehouse.Email && c.IdentityCode == addWarehouse.IdentityCode))
                {
                    return BadRequest(new {message = "email or identity code existed"});
                }
                return Ok(new
                {
                    result = _accountService.addWarehouse(addWarehouse)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("getAdmin")]
        public IActionResult getAdmin()
        {
            try
            {
                return Ok(_accountService.getAdmin());
            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }[HttpGet("getAccountWarehouse")]
        public IActionResult getAccountWarehouse()
        {
            try
            {
                return Ok(_accountService.getAccountWarehouse());
            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
