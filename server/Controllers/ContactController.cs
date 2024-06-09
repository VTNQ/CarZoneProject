using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
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
        [HttpGet("CountContact")]
        public async Task<IActionResult> CountTotal()
        {
            try
            {
                return Ok(await _contactService.TotalContact());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPost("AddContact")]
        public async Task<IActionResult> AddContact([FromBody] AddContact addContact)
        {
            try
            {
                return Ok(new
                {
                   result= _contactService.AddContact(addContact)
                }) ;
            }
            catch
            {
                return BadRequest();
            }
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
