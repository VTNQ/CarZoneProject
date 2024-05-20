using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        private readonly VersionService versionService;
        public VersionController(VersionService versionService)
        {
            this.versionService = versionService;
        }
        [HttpPost("AddVersion")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult AddVersion([FromBody] AddVersion addVersion)
        {
            try
            {
                return Ok(versionService.AddVersion(addVersion));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowVersion")]
        public IActionResult ShowVersion()
        {
            try
            {
                return Ok(versionService.ShowVersion());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteVersion/{id}")]
        public IActionResult DeleteVersion(int id)
        {
            try
            {
                return Ok(versionService.DeleteVersion(id));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
