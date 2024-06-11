using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
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
        [HttpGet("ShowBranch")]
        public IActionResult ShowBranch()
        {
            try
            {
                return Ok(wareHouserService.ShowBranch());
            }
            catch
            {
                return BadRequest();
            }
        }
      
        [HttpGet("ShowCar")]
        public async Task<IActionResult> ShowCar()
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
        [HttpGet("ShowListPicture/{id}")]
        public IActionResult ShowListPicture(int id)
        {
            try
            {
                return Ok(wareHouserService.ShowListPicture(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetCartoShowRoom/{id}")]
        public async Task<IActionResult> GetCartoShowRoom(int id)
        {
            try
            {
                return Ok(wareHouserService.GetCartoShowRoom(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetShowroom/{id}")]
        public async Task<IActionResult> GetShowroom(int id)
        {
            try
            {
                return Ok(wareHouserService.ShowRoom(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetCarToWareHouse/{id}")]
        public async Task<IActionResult> GetCarToWareHouse(int id)
        {
            try
            {
                return Ok(wareHouserService.GetCarToWareHouse(id));   
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
                return Ok(wareHouserService.ShowWareHouse());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetFilterShowRoom/{id}")]
        public IActionResult GetFilterShowRoom(int id)
        {
            try
            {
                return Ok(wareHouserService.GetShowRoom(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddCarShowRoom")]
        [Produces("application/json")]
        public async Task<IActionResult> AddCarShowRoom([FromForm] CreateCarShowRoom createCarShowRoom)
        {
            try
            {
                return Ok(new
                {
                    result = wareHouserService.CreateShowRoom(createCarShowRoom)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowLatestCar")]
        public IActionResult ShowLatestCar()
        {
            try
            {
                return Ok(wareHouserService.ShowLatestCar());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("SendMessage")]
        public IActionResult SendMessage(SendMessage sendMessage)
        {
            try
            {
                return Ok(wareHouserService.SendMessage(sendMessage));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowModel")]
        public IActionResult ShowModel()
        {
            try
            {
                return Ok(wareHouserService.ShowModel());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("CompareCar/{id}")]
        public IActionResult CompareCar(int id)
        {
            try
            {
                return Ok(wareHouserService.CompareCar(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailWareHouseCar/{id}")]
        public async Task<IActionResult> DetailWareHouseCar(int id)
        {
            try
            {
                return Ok(wareHouserService.DetailWareHouseCar(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailCar/{id}")]
        public IActionResult DetailCar(int id)
        {
            try
            {
                return Ok(wareHouserService.DetailCar(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetWareHouseCar/{id}")]
        public async Task<IActionResult> GetWareHouseCar(int id)
        {
            try {
                return Ok(wareHouserService.GetWareHouseCar(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailCartoShowRoom/{id}")]
        public IActionResult DetailCartoShowRoom(int id)
        {
            try
            {
                return Ok(wareHouserService.DetailCartoShowRoom(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowWareHouse/{idShowRoom}")]
        public async Task<IActionResult> ShowWareHouse(int idShowRoom)
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
        [HttpGet("CarWareHouse/{id}")]
        public async Task<IActionResult> CarWareHouse(int id)
        {
            try
            {
                return Ok(wareHouserService.CarWareHouse(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("updateModel/{id}")]
        public IActionResult updateModel(int id,[FromBody] UpdateModel updateModel) {
            try
            {
                return Ok(new
                {
                    result = wareHouserService.updateModel(id, updateModel)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("findModelByBrand/{id}")]
        public IActionResult findModelByBrand(int id)
        {
            try
            {
                return Ok(wareHouserService.findModelByBrand(id));
            }
            catch 
            {
                return BadRequest() ;
            }
        }
    }
}
