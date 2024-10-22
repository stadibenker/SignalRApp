// establish connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// listen and process events
connectionUserCount.on("updateTotalViews", (value) => {
	var connectedUsersCountSpan = document.getElementById("totalViewsCounter");
	connectedUsersCountSpan.innerText = value.toString();
});

// send event to the hub
function newWindowLoadedOnClient() {
	connectionUserCount.send("NewWindowLoaded");
};

connectionUserCount.start().then(connectionSuccess, connectionFail);

function connectionSuccess() {
	console.log("connection to user hub succeeded.");
	newWindowLoadedOnClient();
}

function connectionFail(e) {
	console.log("connection to user hub failed.", e);
}