import { Game } from './Modules/Game.js';
import { Inputs } from './Modules/Inputs.js';
import { Upgrades } from './Modules/Upgrades.js';
import { Events } from './Modules/Events.js'

export * from './Modules/ServerList.js';

export class GatsApi {
	constructor(ws) {
		ws.binaryType = 'arraybuffer';

		this.ws = ws;
		this.myPlayer = null;
		this.game = new Game(this.ws);
		this.inputs = new Inputs(this.ws);
		this.upgrades = new Upgrades(this.ws);
		this.events = new Events(this.ws);

		this.events.addPacketListener('VERSION', this.onVersion.bind(this));
		this.events.addPacketListener('PLAYER_INFO', this.onPlayerInfo.bind(this));
	}

	onPlayerInfo(e) {
		this.myPlayer = e[0];
	}

	onVersion(e) {
		this.game.sendTimestamp();
		setInterval(this.inputs.sendHeartbeat.bind(this.inputs), 1000);
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

