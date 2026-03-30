export class Game {
	constructor(ws) {
		this.ws = ws;
	}
	
	sendTimestamp() {
		this.ws.send(`q,${Date.now()}`); // for some reason the server requires you to send a timestamp but I'm not sure why, maybe something to do with the heartbeats
	}

	sendChatMessage(message) {
		this.ws.send(`c,${message.replaceAll(',', '~')}\x00`);
	}

	joinGame(weaponId, armorLevel, color) {
		this.ws.send(`0,${weaponId},${armorLevel},${color}\x00`);
	}
}

