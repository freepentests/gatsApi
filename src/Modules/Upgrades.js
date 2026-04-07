export class Upgrades {
	constructor(ws) {
		this.ws = ws;
	}

	upgrade(itemId, slot) {
		this.ws.send(`u,${itemId},${slot}`);
	}

	useItem() {
		this.ws.send(`k,5,1`);
		setTimeout(() => {
			this.ws.send(`k,5,0`);
		}, 200);
	}
}

