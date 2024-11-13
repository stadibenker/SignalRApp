using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SignalRApp.Data;

namespace SignalRApp.Hubs
{
	public class ChatHub : Hub
	{
		private readonly ApplicationDbContext context;

		public ChatHub(ApplicationDbContext context)
		{
			this.context = context;
		}

		public async Task SendMessageToAll(string user, string message)
		{
			await Clients.All.SendAsync("NewMessage", user, message);
		}

		[Authorize]
		public async Task SendMessageToUser(string sender, string receiver, string message)
		{
			var user = await context.Users.FirstOrDefaultAsync(x => string.Equals(x.Email.ToLower(), receiver.ToLower()));

			if (user == null) {
				return;
			}

			await Clients.User(user.Id).SendAsync("NewMessage", sender, message);
		}
	}
}
