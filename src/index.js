import { Game } from './modules/game.js';
import { Inputs } from './modules/inputs.js';
import { Upgrades } from './modules/upgrades.js';
import { Events } from './modules/events.js'

class GatsApi {
	constructor(ws) {
		ws.binaryType = 'arraybuffer';

		this.game = new Game(ws);
		this.inputs = new Inputs(ws);
		this.upgrades = new Upgrades(ws);
		this.events = new Events(ws);

		console.log('GatsApi Initialized!');
	}
}

window.GatsApi = GatsApi;

