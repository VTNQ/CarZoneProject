using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly ColorService colorService;
        private readonly DatabaseContext databaseContext;
        public ColorController(ColorService colorService,DatabaseContext databaseContext) { 
        this.colorService = colorService;
            this.databaseContext = databaseContext;
        }
        [HttpDelete("DeleteColor/{id}")]
        public async Task<IActionResult>  DdeleteColor(int id)
        {
            try
            {
                if(databaseContext.Cars.Any(d=>d.IdColorInSide==id || d.IdColorOutSide==id)) {
                    return BadRequest(new { message = "Color Delete Failed" });
                }
                return Ok(new
                {
                    result = colorService.DeleteColor(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("TotalColor")]
        public async Task<IActionResult> TotalColor()
        {
            try
            {
                return Ok(await colorService.TotalColor());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateColor/{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateColor(int id,[FromBody] AddColor UpdateColor)
        {
            try
            {
                if (databaseContext.Colors.Any(d => d.Name == UpdateColor.Name && d.Id!=id))
                {
                    return BadRequest(new { message = "Color already Exist" });
                }
                return Ok(new
                {
                    resul = colorService.UpdateColor(id, UpdateColor)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddColor")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddColor([FromBody] AddColor addColor)
        {
            try
            {
                if (databaseContext.Colors.Any(d => d.Name == addColor.Name))
                {
                    return BadRequest(new { message = "Color already Exist" });
                }
                return Ok(new
                {
                    result = colorService.AddColor(addColor)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowColor")]
        public async Task<IActionResult> ShowColor()
        {
            try
            {
                return Ok(colorService.ShowColor());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
