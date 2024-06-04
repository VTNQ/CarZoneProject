using Microsoft.AspNetCore.Http;
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
        [HttpGet("TotalInvoice/{idshowroom}")]
        public async Task<IActionResult>ToTalInvoice(int idshowroom)
        {
            try
            {
                return Ok(await InVoiceService.TotalInvoice(idshowroom));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailOutOrder")]
        public IActionResult DetailOutOrder()
        {
            try
            {
                return Ok(InVoiceService.DetailOutOrder());
            }
            catch
            {
                return BadRequest();
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