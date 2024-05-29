using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowroomController : Controller
    {
        private DatabaseContext databaseContext;
        private ShowroomService showroomService;
        public ShowroomController(DatabaseContext databaseContext, ShowroomService showroomService)
        {
            this.databaseContext = databaseContext;
            this.showroomService = showroomService;
        }
      
        [HttpPost("addShowroom")]
        [Produces("application/json")]
        public IActionResult addShowroom([FromBody] AddShowroom addShowroom)
        {
            try
            {
                if(databaseContext.Showrooms.Any(c=>c.Name == addShowroom.Name)) {
                    return BadRequest(new { message = "name has already exist" });
                }
                return Ok(new
                {
                    result = showroomService.createShowroom(addShowroom)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("showShowroom")]
        public async Task<IActionResult> ShowShowroom()
        {
            try
            {
                var showrooms = await showroomService.showShowroom(); // Assuming ShowShowroom returns Task<IEnumerable<dynamic>>
                return Ok(showrooms);
            }
            catch
            {
                return BadRequest(new { message = "An error occurred while retrieving showrooms." });
            }
        }
        [HttpPut("updateShowroom/{id}")]
        [Consumes("application/json")]
        public IActionResult updateShowroom (int id,[FromBody]UpdateShowroom updateShowroom)
        {
            try
            {
                if(databaseContext.Showrooms.Any(c => c.Name == updateShowroom.Name))
                {
                    return BadRequest(new { Message = "Name has already exist" });
                }
                return Ok(new
                {
                    result = showroomService.updateShowroom(id, updateShowroom)
                });
                
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
