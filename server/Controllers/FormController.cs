using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly FormService _formService;
        private readonly DatabaseContext databaseContext;
        public FormController(FormService formService,DatabaseContext databaseContext)
        {
            this.databaseContext= databaseContext;
            _formService = formService;
        }
        [HttpDelete("DeleteForm/{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            try
            {
                if(databaseContext.Cars.Any(d=>d.IdForm==id)) {
                    return BadRequest(new { message = "Cannot delete form" });
                }
                return Ok(new
                {
                    result = _formService.DeleteForm(id)
                });
            }
            catch
            {
                return BadRequest();    
            }
        }
        [HttpPut("UpdateForm/{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateForm(int id, [FromBody] AddForm UpdateForm)
        {
            try
            {
                if(databaseContext.Forms.Any(d=>d.Id!=id && d.Name==UpdateForm.Name))
                {
                    return BadRequest(new { message = "Name already Exist" });
                }
                return Ok(new
                {
                    result = _formService.UpdateForm(id, UpdateForm),
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("TotalForm")]
        public async Task<IActionResult> TotalForm()
        {
            try
            {
                return Ok(await _formService.TotalForm());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddForm")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddForm([FromBody] AddForm addForm)
        {
            try
            {
                if(databaseContext.Forms.Any(d=>d.Name==addForm.Name)) {
                    return BadRequest(new { message = "Name already Exist" });
                }
                return Ok(new
                {
                    result = _formService.AddForm(addForm)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowForm")]
        public async Task<IActionResult> ShowForm()
        {
            try
            {
                return Ok(_formService.ShowForm());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
