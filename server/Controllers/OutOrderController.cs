using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutOrderController : ControllerBase
    {
        private readonly OutOrderService _orderService;
        private readonly DatabaseContext _databaseContext;
        public OutOrderController(OutOrderService orderService, DatabaseContext databaseContext)
        {
            _orderService = orderService;
            _databaseContext = databaseContext;
        }
        [HttpGet("ShowInvoice/{id}")]
        public async Task<IActionResult> ShowInvoice(int id)
        {
            try
            {
                return Ok(_orderService.ShowInvoice(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddOutOrder")]
        [Produces("application/json")]
        public async Task<IActionResult> AddOutOrder([FromForm]Data.OutOrder outOrder)
        {
            try
            {
                return Ok(new
                {
                    result = _orderService.AddOutOrder(outOrder)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        
        [HttpGet("TotalContract/{id}")]
        public async Task<IActionResult> TotalContract(int id)
        {
            try
            {
                return Ok(await _orderService.TotalContract(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetCountOrder/{id}/{month}")]
        public async Task<IActionResult> GetCountOrder(int id,int month)
        {
            try
            {
                return Ok(_orderService.GetCountOrder(id,month));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("TotalOutOrder/{id}")]
        public async Task<IActionResult> TotalOutOrder(int id)
        {
            try
            {
                return Ok(await  _orderService.TotalOutOrder(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailOutOrder/{id}")]
        public async Task<IActionResult> DetailOutOrder(int id)
        {
            try
            {
                return Ok(_orderService.DetailOutOrder(id));
            }
            catch
            {
                return BadRequest();    
            }
        }
        [HttpGet("ShowContract/{id}")]
        public async Task<IActionResult> ShowContract(int id)
        {
            try
            {
                return Ok(_orderService.ShowContract(id));
            }
            catch
            {
                return BadRequest();
            }
        }[HttpGet("ShowAllContract")]
        public IActionResult ShowAllContract()
        {
            try
            {
                return Ok(_orderService.ShowAllContract());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddContract/{id}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddContract(int id,[FromBody]AddContract addContract)
        {
            try
            {
                if (_databaseContext.Contracts.Any(d => d.IdOrder == id))
                {
                    return BadRequest(new { message = "Contract already Exist" });
                }
                return Ok(new
                {
                    result = _orderService.AddContract(id, addContract)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddInvoice/{id}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddInvoice(int id)
        {
            try
            {
                if(_databaseContext.InVoices.Any(d=>d.IdOrder==id)) {
                    return BadRequest(new { message = "Invoice already Exist" });
                }

                return Ok(new
                {
                    result = _orderService.AddInvoice(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowOutOrder/{id}")]
        public async Task<IActionResult> ShowOutOrder(int id)
        {
            try
            {
                return Ok(_orderService.ShowOutOrder(id));
            }
            catch
            {
                return BadRequest();    
            }
        }
        [HttpGet("ShowAllOutOrder")]
        public IActionResult ShowAllOutOrder()
        {
            try
            {
                return Ok(_orderService.ShowAllOutOrder());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetWareHouse/{id}")]
        public IActionResult GetWareHouse(int id)
        {
            try
            {
                return Ok(_orderService.GetWareHouse(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowCar/{id}")]
        public async Task<IActionResult> ShowCar(int id)
        {
            try
            {
                return Ok(_orderService.ShowCar(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowCustomer")]
        public async Task<IActionResult> ShowCustomer()
        {
            try
            {
                return Ok(_orderService.ShowCustomer());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
