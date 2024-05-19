using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactService _contactService;
        public ContactController(ContactService contactService)
        {
            _contactService = contactService;
        }
        [HttpGet("ShowContact")]
        public IActionResult ShowContact()
        {
            try
            {
                return Ok(_contactService.ShowContact());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
