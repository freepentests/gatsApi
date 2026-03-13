import { ChatMessage, Player } from './entities.js';

export class Events {
	constructor(ws) {
		this.ws = ws;
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
				if (values[0] !== 'c') return; // "c" is for chat messages
				if (values.length < 17) return; // if the length of the values is less than 17 then it means a chat mesage wasn't sent

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
}

