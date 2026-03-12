export class Game {
	constructor(ws) {
		this.ws = ws;
	}

	sendChatMessage(message) {
		this.ws.send(`c,${message}\x00`);
	}

	joinGame(weaponId, armorLevel, color) {
		this.ws.send(`c,${weaponId},${armorLevel},${color},\x00`);
	}
}

