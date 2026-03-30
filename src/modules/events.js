import {
	ChatMessage,
	Player,
	Bullet,
	Building
} from './entities.js';

export class Events {
	constructor(ws) {
		this.ws = ws;
	}

	createConnectListener(callback) {
		this.ws.addEventListener('message', (msg) => {
			if (typeof msg.data === 'string') return;
			const textData = new TextDecoder().decode(msg.data);
			if (!textData.startsWith('version,')) return;

			const version = textData.split(',')[1];
			callback(version);
		});
	}

	createEntityUpdateListener(callback) {
		this.ws.addEventListener('message', (msg) => {
			const textData = new TextDecoder().decode(msg.data);
			if (!textData.startsWith('b,')) return;

			const entities = textData.split('|');
			callback(entities);
		});
	}

	createChatMessagesListener(callback) {
		this.createEntityUpdateListener((entities) => {
			const chatMessages = [];

			entities.forEach((entity) => {
				const values = entity.split(',');
				if (values[0] !== 'c') return; // "c" is the only packet containing chat messages
				if (values[16] == undefined) return;

				const senderId = values[1];
				const messageContent = values[values.length - 1].replaceAll('~', ','); // we replace all occurances of "~" with "," because the server encodes , as ~ to make it easier for the client to parse.

				chatMessages.push(new ChatMessage(
					senderId,
					messageContent
				));
			});

			if (chatMessages.length > 0) return callback(chatMessages);
		})
	}

	createPlayerInfoListener(callback) {
		this.createEntityUpdateListener((entities) => {
			const players = [];

			for (const i in entities) {
				const entity = entities[i];

				const values = entity.split(',');
				if (values[0] !== 'b') continue; // "b" is for players

				const playerId = values[1];
				const playerX = values[2];
				const playerY = values[3];
				const speedX = values[4];
				const speedY = values[5];
				const aimingYaw = values[6];

				players.push(new Player(
					playerId,
					playerX,
					playerY,
					speedX,
					speedY,
					aimingYaw
				));
			}

			if (players.length > 0) return callback(players);
		});
	}

	createBulletsListener(callback) {
		this.createEntityUpdateListener((entities) => {
			const bullets = [];

			entities.forEach((entity) => {
				const values = entity.split(',');

				if (values[0] !== 'h') return; // "h" is a bullet

				const bulletId = values[1];
				const bulletX = values[2];
				const bulletY = values[3];

				bullets.push(new Bullet(
					bulletId,
					bulletX,
					bulletY
				));
			});

			if (bullets.length > 0) return callback(bullets);
		});
	}

	createBuildingsListener(callback) {
		this.createEntityUpdateListener((entities) => {
			const buildings = [];

			entities.forEach((entity) => {
				const values = entity.split(',');

				if (values[0] !== 'k') return; // "k" is a building

				const buildingId = values[1];
				const buildingX = values[2];
				const buildingY = values[3];

				buildings.push(new Building(
					buildingId,
					buildingX,
					buildingY
				));
			});

			if (buildings.length > 0) return callback(buildings);
		});
	}
}

