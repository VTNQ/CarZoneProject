﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InOrderController : ControllerBase
    {
        private InOrderService _orderService;
        public InOrderController(InOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("ShowInOrder/{id}")]
        public IActionResult ShowInOrder(int id)
        {
            try
            {
                return Ok(_orderService.ShowInOrder(id)); 
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddInorder")]
        [Produces("application/json")]
        public IActionResult AddInorder([FromForm] InOrder inOrder)
        {
            try
            {
                return Ok(new
                {
                    result = _orderService.AddInOrder(inOrder)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailInOrder/{id}")]
        public IActionResult DetailInOrder(int id)
        {
            try
            {
                return Ok(_orderService.DetailInOrder(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowSupply")]
        public IActionResult ShowSupply()
        {
            try
            {
                return Ok(_orderService.ShowSupply());
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
                return Ok(_orderService.ShowWareHouse());   
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
                return Ok(_orderService.ShowCar());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}