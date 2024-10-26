let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");
let btn_slytherin = document.getElementById("btn_slytherin");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");

let btn_trigger_gryffindor = document.getElementById("btn_trigger_gryffindor");
let btn_trigger_hufflepuff = document.getElementById("btn_trigger_hufflepuff");
let btn_trigger_ravenclaw = document.getElementById("btn_trigger_ravenclaw");
let btn_trigger_slytherin = document.getElementById("btn_trigger_slytherin");

var houseGroupConnection = new signalR.HubConnectionBuilder().withUrl("/hubs/houseGroup").build();

houseGroupConnection.start().then(connectionSuccess, connectionFail);

function connectionSuccess() {
	console.log("connection to house group hub succeeded.");
}

function connectionFail(e) {
	console.log("connection to house group hub failed.", e);
}

houseGroupConnection.on('subscriptionStatusChanged', (houseName, hasSubscribed) => {
	if (hasSubscribed) {
		switch (houseName.toLowerCase()) {
			case 'gryffindor': {
				btn_gryffindor.style.display = 'none';
				btn_un_gryffindor.style.display = '';
				break;
			}
			case 'hufflepuff': {
				btn_hufflepuff.style.display = 'none';
				btn_un_hufflepuff.style.display = '';
				break;
			}
			case 'ravenclaw': {
				btn_ravenclaw.style.display = 'none';
				btn_un_ravenclaw.style.display = '';
				break;
			}
			case 'slytherin': {
				btn_slytherin.style.display = 'none';
				btn_un_slytherin.style.display = '';
				break;
			}
			default:
				break;
		}
		lbl_houseJoined.innerText += ' ' + houseName;
		toastr.success(`You have subscribed to ${houseName}`);
	} else {
		switch (houseName.toLowerCase()) {
			case 'gryffindor': {
				btn_gryffindor.style.display = '';
				btn_un_gryffindor.style.display = 'none';
				break;
			}
			case 'hufflepuff': {
				btn_hufflepuff.style.display = '';
				btn_un_hufflepuff.style.display = 'none';
				break;
			}
			case 'ravenclaw': {
				btn_ravenclaw.style.display = '';
				btn_un_ravenclaw.style.display = 'none';
				break;
			}
			case 'slytherin': {
				btn_slytherin.style.display = '';
				btn_un_slytherin.style.display = 'none';
				break;
			}
			default:
				break;
		}
		lbl_houseJoined.innerText = lbl_houseJoined.innerText.replace(houseName, '');
		toastr.success(`You have unsubscribed from ${houseName}`);
	}
});

houseGroupConnection.on('triggerHouseNotification', (houseName) => {
	toastr.success(`${houseName}! You have a new notification`);
});

btn_gryffindor.addEventListener('click', () => {
	houseGroupConnection.send('JoinHouse', 'Gryffindor');
});

btn_hufflepuff.addEventListener('click', () => {
	houseGroupConnection.send('JoinHouse', 'Hufflepuff');
});

btn_ravenclaw.addEventListener('click', () => {
	houseGroupConnection.send('JoinHouse', 'Ravenclaw');
});

btn_slytherin.addEventListener('click', () => {
	houseGroupConnection.send('JoinHouse', 'Slytherin');
});

btn_un_gryffindor.addEventListener('click', () => {
	houseGroupConnection.send('LeaveHouse', 'Gryffindor');
});

btn_un_hufflepuff.addEventListener('click', () => {
	houseGroupConnection.send('LeaveHouse', 'Hufflepuff');
});

btn_un_ravenclaw.addEventListener('click', () => {
	houseGroupConnection.send('LeaveHouse', 'Ravenclaw');
});

btn_un_slytherin.addEventListener('click', () => {
	houseGroupConnection.send('LeaveHouse', 'Slytherin');
});

btn_trigger_gryffindor.addEventListener('click', () => {
	houseGroupConnection.send('NotifyHouse', 'Gryffindor');
});

btn_trigger_hufflepuff.addEventListener('click', () => {
	houseGroupConnection.send('NotifyHouse', 'Hufflepuff');
});

btn_trigger_ravenclaw.addEventListener('click', () => {
	houseGroupConnection.send('NotifyHouse', 'Ravenclaw');
});

btn_trigger_slytherin.addEventListener('click', () => {
	houseGroupConnection.send('NotifyHouse', 'Slytherin');
});