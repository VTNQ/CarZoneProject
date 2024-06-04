using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly StatisticService _statisticService;

        public StatisticController(StatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet("getAvenueByPrecious")]
        public IActionResult GetAvenueByPrecious()
        {
            try
            {
                var result = _statisticService.getAvenueByPrecious();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception here
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getNewCustomerByPrecious")]
        public IActionResult GetnewCustomerByPrecious()
        {
            try
            {
                var result = _statisticService.getNewCustomerByPrecious();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception here
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getNewOrderByPrecious")]
        public IActionResult GetNewOrderByPrecious()
        {
            try
            {
                var result = _statisticService.getNewOrderByPrecious();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception here
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getTotalCar")]
        public IActionResult GetTotalCar()
        {
            try
            {
                var result = _statisticService.getTotalCar();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception here
                return BadRequest(ex.Message);
            }
        }
    }
}
