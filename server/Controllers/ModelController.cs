using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly ModelService modelService;
        private readonly DatabaseContext databaseContext;

        public ModelController(ModelService modelService,DatabaseContext databaseContext) { 
        this.modelService = modelService;
            this.databaseContext = databaseContext;
        }
        [HttpGet("ShowModel")]
        public async Task<IActionResult> ShowModel()
        {
            try
            {
                return Ok(modelService.ShowModel());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("TotalModel")]
        public async Task<IActionResult> TotalModel()
        {
            try
            {
                return Ok(await modelService.TotalModel());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleModel/{id}")]
        public async Task<IActionResult> DeleteModel(int id)
        {
            try
            {
                if(databaseContext.Cars.Any(d=>d.IdModel==id)) {
                    return BadRequest(new { message = "Cannot delete Model" });
                }
                return Ok(new
                {
                    result = modelService.DeleteModel(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateModel/{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateModel(int id, [FromBody] AddModel UpdateModel)
        {
          
            try
            {
                if (databaseContext.Models.Any(d=>d.Name==UpdateModel.Name && d.Id != id))
                {
                    return BadRequest(new { message = "Name already Exist" });
                }
                    return Ok(new
                {
                    result = modelService.UpdateModel(id, UpdateModel)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddModel")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public async Task<IActionResult> AddModel([FromBody] AddModel addModel)
        {
            try
            {
                if (databaseContext.Models.Any(d => d.Name == addModel.Name))
                {
                    return BadRequest(new { message = "Name already Exist" });
                }
                return Ok(new
                {
                    result = modelService.AddModel(addModel),
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowBrand")]
        public async Task<IActionResult> ShowBrand()
        {
            try
            {
                return Ok(modelService.ShowBrand());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
