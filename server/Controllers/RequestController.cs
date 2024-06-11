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
        public IActionResult UpdateRequest(int id)
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
        [HttpGet("ShowRequestAdminShowRoom/{id}")]
        public async Task<IActionResult> ShowRequestAdminShowRoom(int id)
        {
            try
            {
                return Ok(_requestService.ShowRequestWareHouse(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowRequestShowRoom/{id}")]
        public async Task<IActionResult> ShowRequestWareHouse(int id)
        {
            try
            {
                return Ok(_requestService.ShowRequestWareHouse(id));

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowDistrict/{id}")]
        public async Task<IActionResult> ShowDistrict(int id)
        {
            try
            {
                return Ok(_requestService.ShowDistrict(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowShowRoom/{id}")]
        public async Task<IActionResult> ShowShowRoom(int id)
        {
            try
            {
                return Ok(_requestService.GetShowRoom(id));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
