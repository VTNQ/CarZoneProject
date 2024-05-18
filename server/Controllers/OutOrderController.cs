﻿using Microsoft.AspNetCore.Http;
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
        public IActionResult ShowInvoice(int id)
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
        public IActionResult AddOutOrder([FromForm]Data.OutOrder outOrder)
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
        [HttpGet("DetailOutOrder/{id}")]
        public IActionResult DetailOutOrder(int id)
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
        public IActionResult ShowContract(int id)
        {
            try
            {
                return Ok(_orderService.ShowContract(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddContract/{id}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult AddContract(int id,[FromBody]AddContract addContract)
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
        public IActionResult AddInvoice(int id)
        {
            try
            {
                if(_databaseContext.Invoices.Any(d=>d.IdOrder==id)) {
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
        public IActionResult ShowOutOrder(int id)
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
        [HttpGet("ShowCustomer")]
        public IActionResult ShowCustomer()
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