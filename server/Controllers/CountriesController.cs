using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    public class CountriesController : Controller
    {
        public IActionResult Index()
        {

            return View();
        }
    }
}
