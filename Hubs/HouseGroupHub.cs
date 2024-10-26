using Microsoft.AspNetCore.SignalR;

namespace SignalRApp.Hubs
{
	public class HouseGroupHub : Hub
	{
		public static List<string> GroupsJoined { get; set; } = new List<string>();

		public async Task JoinHouse(string houseName)
		{
			var connectionKey = Context.ConnectionId + ":" + houseName;
			if (!GroupsJoined.Contains(connectionKey))
			{
				GroupsJoined.Add(connectionKey);

				await Clients.Caller.SendAsync("subscriptionStatusChanged", houseName, true);

				await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
			}
		}

		public async Task LeaveHouse(string houseName)
		{
			var connectionKey = Context.ConnectionId + ":" + houseName;
			if (GroupsJoined.Contains(connectionKey))
			{
				GroupsJoined.Remove(connectionKey);

				await Clients.Caller.SendAsync("subscriptionStatusChanged", houseName, false);

				await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
			}
		}

		public async Task NotifyHouse(string houseName)
		{
			await Clients.Group(houseName).SendAsync("triggerHouseNotification", houseName);
		}
	}
}
