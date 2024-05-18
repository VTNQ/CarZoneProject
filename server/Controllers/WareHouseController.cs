using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WareHouseController : ControllerBase
    {
        private readonly WareHouserService wareHouserService;
        public WareHouseController(WareHouserService wareHouserService)
        {
            this.wareHouserService = wareHouserService;
        }
        [HttpGet("ShowCar")]
        public IActionResult ShowCar()
        {
            try
            {
                return Ok(wareHouserService.ShowCar());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowWareHouse/{idShowRoom}")]
        public IActionResult ShowWareHouse(int idShowRoom)
        {
            try
            {
                return Ok(wareHouserService.ShowCarWareHouse(idShowRoom));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
