﻿using Microsoft.AspNetCore.Http;
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