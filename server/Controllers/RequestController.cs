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
        [HttpPut("UpdateRequest/{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateRequest(int id)
        {
            try
            {
                return Ok(_requestService.UpdateRequest(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddRequest")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddRequest(AddRequest addRequest)
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
        [HttpGet("ShowRequestSupplier/{Employee}")]
        public async Task<IActionResult> ShowRequestSupplier(string Employee)
        {
            try
            {
                return Ok(_requestService.ShowRequestSupplier(Employee));   
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowSupplier")]
        public async Task<IActionResult> ShowSupplier()
        {
            try
            {
                return Ok(_requestService.ShowSupplier());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowRequestWareHouse")]
        public async Task<IActionResult> ShowRequestWareHouse()
        {
            try
            {
                return Ok(_requestService.ShowRequestWareHouse());

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowWareHouse")]
        public async Task<IActionResult> ShowWareHouse()
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
