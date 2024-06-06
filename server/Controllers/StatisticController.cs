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
                
                return BadRequest(ex.Message);
            }
        }[HttpGet("getAvenueByMonth")]
        public IActionResult GetAvenueByMonth()
        {
            try
            {
                var result = _statisticService.getAvenueByMonth();
                return Ok(result);
            }
            catch (Exception ex)
            {
               
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
                
                return BadRequest(ex.Message);
            }
        }[HttpGet("getCustomerByMonth")]
        public IActionResult getCustomerByMonth()
        {
            try
            {
                var result = _statisticService.getNewCustomerByMonth();
                return Ok(result);
            }
            catch (Exception ex)
            {
                
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
                
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getDataEachCar")]
        public IActionResult getDataEachCar()
        {
            try
            {
                var result = _statisticService.getDataBrand();
                return Ok(result);
            }
            catch (Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAvenueEachShowroom")]
        public IActionResult getAvenueEachShowroom()
        {
            try
            {
                var result = _statisticService.getAvenueEachShowroom();
                return Ok(result);
            }
            catch (Exception ex)
            {
               
                return BadRequest(ex.Message);
            }
        }[HttpGet("getTopCar")]
        public IActionResult getTopCar()
        {
            try
            {
                var result = _statisticService.getTopSellCar();
                return Ok(result);
            }
            catch (Exception ex)
            {
               
                return BadRequest(ex.Message);
            }
        }[HttpGet("getAvenueByCountry")]
        public IActionResult getAvenueByCountry()
        {
            try
            {
                var result = _statisticService.getAvenueByCountry();
                return Ok(result);
            }
            catch (Exception ex)
            {
               
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getHighestAvenueCountry")]
        public IActionResult getHighestAvenueCountry()
        {
            try
            {
                var result = _statisticService.getHighestAvenueCountry();
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
