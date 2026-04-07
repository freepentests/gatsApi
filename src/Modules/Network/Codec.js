const OPCODES = {
	PLAYER_DEATH: 'e',
	PLAYER_JOIN: 'a',
	PLAYER_INFO: 'b',
	LEADERBOARD: 'v',
	AUXILIARY: 'c',
	HEARTBEAT: '.',
	VERSION: 'version',
	GRENADE: 'n',
	BULLET: 'h',
	WALL: 'j'
}

export class Codec {
	decode(packet) {
		if (typeof packet === 'string') return [this.formatPacket(packet)];

		const textData = new TextDecoder().decode(packet);

		const sections = textData
			.split('|')
			.map((section) => section.split(','));

		return sections.map((section) => this.formatPacket(section)); // format each of the sections of the packet
	}

	formatPacket(section) {
		const opcode = section[0];

		switch (opcode) {
			case OPCODES.PLAYER_JOIN:
				return {
					opcode: 'PLAYER_JOIN',
					id: parseInt(section[1]),
					color: section[3],
					team: parseInt(section[22]) === 1 ? 'red' : 'blue',
					username: section[23]
				};

			case OPCODES.PLAYER_INFO:
				return {
					opcode: 'PLAYER_INFO',
					id: parseInt(section[1]),
					x: parseInt(section[2]),
					y: parseInt(section[3]),
					speedX: parseInt(section[4]),
					speedY: parseInt(section[5]),
					yaw: parseInt(section[6])
				};

			case OPCODES.HEARTBEAT:
				return {
					opcode: 'HEARTBEAT'
				};

			case OPCODES.WALL:
				return {
					opcode: 'WALL',
					id: parseInt(section[1]),
					type: parseInt(section[2]) === 1 ? 'orange' : 'blue', // I'm pretty sure 1 is for orange walls but i'm not sure
					x: parseInt(section[3]),
					y: parseInt(section[4]),
					angle: parseInt(section[5])
				};

			case OPCODES.GRENADE:
				return {
					opcode: 'GRENADE',
					id: parseInt(section[1]),
					x: parseInt(section[2]),
					y: parseInt(section[3])
				};

			case OPCODES.BULLET:
				return {
					opcode: 'BULLET',
					id: parseInt(section[1]),
					x: parseInt(section[2]),
					y: parseInt(section[3])
				};

			case OPCODES.AUXILIARY:
				return {
					opcode: 'AUXILIARY',
					playerId: parseInt(section[1]),
					remainingAmmo: parseInt(section[2]),
					isTyping: Boolean(section[13]),
					chatMessage: section[16]
				};

			case OPCODES.PLAYER_DEATH:
				return {
					opcode: 'PLAYER_DEATH',
					playerId: parseInt(section[1])
				};

			case OPCODES.LEADERBOARD:
				const leaderboardData = section
					.slice(2)
					.map((player) => player.split('.'))
					.map((parts) => {
						return {
							playerId: parseInt(parts[0].slice(1)),
							score: parseInt(parts[2]),
							kills: parseInt(parts[3])
						}
					});

				return {
					opcode: 'LEADERBOARD',
					playerId: parseInt(section[1]),
					leaderboardData: leaderboardData
				};

			case OPCODES.VERSION:
				return {
					opcode: 'VERSION',
					version: section[1]
				}

			default:
				return {
					opcode: opcode
				};
		}
	}
}

