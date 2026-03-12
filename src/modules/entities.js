export class ChatMessage {
	constructor(senderId, messageContents) {
		this.senderId = parseInt(senderId);
		this.messageContents = messageContents;
		return this;
	}
}

export class Player {
	constructor(playerId, playerX, playerY, speedX, speedY, aimingYaw) {
		this.playerId = parseInt(playerId);
		this.playerX = parseInt(playerX);
		this.playerY = parseInt(playerY);
		this.speedX = parseInt(speedX);
		this.speedY = parseInt(speedY);
		this.aimingYaw = parseInt(aimingYaw);
		return this;
	}
}

