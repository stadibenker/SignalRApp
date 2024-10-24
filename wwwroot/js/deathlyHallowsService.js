// establish connection
var deathlyHallowsConnection = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyHallows").build();

var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

// listen and process events
deathlyHallowsConnection.on("updateDeathlyHallows", (cloak, stone, wand) => {
	cloakSpan.innerText = cloak;
	stoneSpan.innerText = stone;
	wandSpan.innerText = wand;
});

deathlyHallowsConnection.start().then(connectionSuccess, connectionFail);

function connectionSuccess() {
	deathlyHallowsConnection.invoke("GetRaceStatus").then(result => {
		cloakSpan.innerText = result.cloak;
		stoneSpan.innerText = result.stone;
		wandSpan.innerText = result.wand;
	});
	console.log("connection to deathly hallows hub succeeded.");
}

function connectionFail(e) {
	console.log("connection to deathly hallows hub failed.", e);
}