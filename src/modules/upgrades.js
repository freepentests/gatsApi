export class Upgrades {
	constructor(ws) {
		this.ws = ws;
	}

	upgrade(itemId, slot) {
		this.ws.send(`u,${itemId},${slot}\x00`)
	}

	useItem() {
		this.ws.send(`u,5,1\x00`);
		this.ws.send(`u,5,0\x00`);
	}
}

