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

export class Bullet {
	constructor(bulletId, bulletX, bulletY) {
		this.bulletId = parseInt(bulletId);
		this.bulletX = parseInt(bulletX);
		this.bulletY = parseInt(bulletY);
		return this
	}
}

export class Building {
	constructor(buildingId, buildingX, buildingY) {
		this.buildingId = parseInt(buildingId);
		this.buildingX = parseInt(buildingX);
		this.buildingY = parseInt(buildingY);
		return this;
	}
}

export class Wall {
	constructor() {}
}

