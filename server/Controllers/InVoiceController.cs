﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InVoiceController:ControllerBase
    {
    
        private InVoiceService InVoiceService;

        public InVoiceController(InVoiceService inVoiceService)
        {
            InVoiceService = inVoiceService;
        }

        [HttpGet("ShowInvoice/{idEmployee}")]
        public IActionResult ShowInvoice(int idEmployee)
        {
            try
            {
                return Ok(InVoiceService.ShowInvoice(idEmployee));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        [HttpGet("HistoryInVoice")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(InVoiceService.FindAll());
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Not Data" });
            }
        }
    }
}