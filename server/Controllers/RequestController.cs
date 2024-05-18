using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly RequestService _requestService;
        public RequestController(RequestService requestService) { 
        _requestService = requestService;
        }
        [HttpPost("AddRequest")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult AddRequest(AddRequest addRequest)
        {
            try
            {
                return Ok(new
                {
                    result = _requestService.AddRequest(addRequest),
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowWareHouse")]
        public IActionResult ShowWareHouse()
        {
            try
            {
                return Ok(_requestService.ShowWareHouse());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
