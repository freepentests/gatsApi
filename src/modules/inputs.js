export class Inputs {
	constructor(ws) {
		this.ws = ws;
	}

	sendInput(argOne, argTwo) {
		this.ws.send(`k,${argOne},${argTwo},\x00`);
	}

	sendPing() {
		this.ws.send('.');
	}

	aim(degrees) {
		this.ws.send(`m,2222,2222,${degrees}\x00`);
	}

	startMove(directionId) {
		this.sendInput(directionId, 1);
	}

	stopMove(directionId) {
		this.sendInput(directionId, 0);
	}
	
	startShoot() {
		this.sendInput(6, 1); // 6 is the opcode for shooting
	}

	startShoot() {
		this.sendInput(6, 0); // 6 is the opcode for shooting
	}
}

