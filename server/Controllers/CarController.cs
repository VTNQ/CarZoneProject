﻿using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : Controller
    {
        private DatabaseContext databaseContext;
        private CarService carService;
        public CarController(DatabaseContext databaseContext,CarService carService)
        {
            this.databaseContext = databaseContext;
            this.carService = carService;
        }
        [HttpPost("addCar")]
        [Produces("application/json")]
        public IActionResult addCar([FromForm] AddCar addCar)
        {
            try
            {
                if(databaseContext.Cars.Any(c=>c.Name == addCar.Name)) {
                    return BadRequest(new { message = "name has already exist" });
                }
                return Ok(new
                {
                    result = carService.addCar(addCar)
                }) ;
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getCar")]
        public IActionResult getCar()
        {
            try
            {
                return Ok(carService.showCar());
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
