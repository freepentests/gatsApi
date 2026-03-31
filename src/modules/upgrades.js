export class Upgrades {
	constructor(ws) {
		this.ws = ws;
	}

	upgrade(itemId, slot) {
		this.ws.send(`u,${itemId},${slot}\x00`)
	}

	useItem() {
		this.ws.send(`k,5,1\x00`);
		setTimeout(() => {
			this.ws.send(`k,5,0\x00`)
		}, 200);
	}
}

