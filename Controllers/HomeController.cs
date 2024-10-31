using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRApp.Hubs;
using SignalRApp.Models;

namespace SignalRApp.Controllers
{
    public class HomeController : Controller
    {
        private IHubContext<DeathlyHallowsHub> _hubContext;


		public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> hubContext)
        {
			_hubContext = hubContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Chat()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (StaticDetails.DeathlyHallowRace.ContainsKey(type)) {
                StaticDetails.DeathlyHallowRace[type]++;
            }

            await _hubContext.Clients.All.SendAsync("updateDeathlyHallows",
                StaticDetails.DeathlyHallowRace[StaticDetails.Cloak],
                StaticDetails.DeathlyHallowRace[StaticDetails.Stone],
                StaticDetails.DeathlyHallowRace[StaticDetails.Wand]
            );

            return Accepted();
        }
    }
}
