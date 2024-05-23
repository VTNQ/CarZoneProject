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
        public IActionResult ShowShowroom()
        {
            try
            {
                return Ok(showroomService.showShowroom());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
