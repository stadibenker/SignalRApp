﻿using Microsoft.AspNetCore.SignalR;

namespace SignalRApp.Hubs
{
	public class UserHub : Hub
	{
		public static int TotalViews { get; set; } = 0;
		public static int TotalUsers { get; set; } = 0;

		public override Task OnConnectedAsync()
		{
			TotalUsers++;
			Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
			return base.OnConnectedAsync();
		}

		public override Task OnDisconnectedAsync(Exception? ex)
		{
			TotalUsers--;
			Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
			return base.OnDisconnectedAsync(ex);
		}

		public async Task<string> NewWindowLoaded()
		{
			TotalViews++;

			await Clients.All.SendAsync("updateTotalViews", TotalViews);

			return $"Total views {TotalViews}";
		}
	}
}
