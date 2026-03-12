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

	// create some constants to replace the magic numbers in packets

	static directions = {
		left: 0,
		right: 1,
		up: 2,
		down: 3
	}

	static weapons = {
		pistol: 0,
		smg: 1,
		shotgun: 2,
		assault: 3,
		sniper: 4,
		lmg: 5
	}

	static colors = {
		red: 0,
		orange: 1,
		yellow: 2,
		green: 3,
		blue: 4,
		purple: 5 // this is actually pink but according to the owner of the game it is purple
	}

	static upgrades = {
		noRecoil: 0, 
		binoculars: 1,
		thermal: 2,
		damage: 3,
		largeMags: 4,
		accuracy: 5,
		silencer: 6,
		speed: 7,
		range: 8,
		kevlar: 9,
		shield: 10,
		medKit: 11,
		grenade: 12,
		knife: 13,
		build: 14,
		camo: 15,
		dash: 16,
		gas: 17,
		landmine: 18,
		frag: 19
	}
}

window.GatsApi = GatsApi;

