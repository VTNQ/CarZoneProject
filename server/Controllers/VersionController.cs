using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        
        private readonly VersionService versionService;
        public VersionController(VersionService versionService,DatabaseContext databaseContext)
        {
            this.versionService = versionService;
            this.databaseContext = databaseContext;
        }
        [HttpPost("AddVersion")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult AddVersion([FromBody] AddVersion addVersion)
        {
            if(databaseContext.Versions.Any(d=>d.ReleaseYear==addVersion.Version)) {
                return BadRequest(new { message = "Version already Exist" });
            }
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
        public async Task<IActionResult> ShowVersion()
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
        [HttpGet("TotalVersion")]
        public async Task<IActionResult> TotalVersion()
        {
            try
            {
                return Ok(await versionService.TotalVersion());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteVersion/{id}")]
        public IActionResult DeleteVersion(int id)
        {
            if(databaseContext.Cars.Any(d=>d.IdVersion==id))
            {
                return BadRequest(new { message = "Delete Failed Version" });
            }
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
