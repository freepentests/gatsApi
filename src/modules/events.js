import { Codec } from './network/codec.js';

export class Events {
	constructor(ws) {
		this.ws = ws;
		this.codec = new Codec();
	}

	addPacketListener(opcode, callback) {
		this.ws.addEventListener('message', (msg) => {
			const data = msg.data;
			const decodedPacket = this.codec.decode(data);
			const filteredPacket = decodedPacket.filter((section) => section.opcode === opcode);

			if (filteredPacket.length > 0) callback(filteredPacket);
		});
	}
}

