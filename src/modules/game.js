export class Game {
	constructor(ws) {
		this.ws = ws;
	}

	sendChatMessage(message) {
		this.ws.send(`c,${message.replaceAll(',', '~')}\x00`);
	}

	joinGame(weaponId, armorLevel, color) {
		this.ws.send(`0,${weaponId},${armorLevel},${color}\x00`);
	}
}

