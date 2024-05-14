using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private AccountService _accountService;
        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
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
