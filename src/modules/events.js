import { Entities } from './entities.js';

export class Events {
	constructor(ws) {
		this.ws = ws;
	}

	createEntityUpdateListener(callback) {
		this.ws.addEventListener('message', (msg) => {
			const textData = new TextDecoder().decode(msg);
			const entities = textData.split('|');
			callback(entities);
		});
	}
}

