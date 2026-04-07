class GatsIndexServerError extends Error {
	constructor(message) {
		super(message);
		this.name = 'GatsIndexServerError';
	}
}

export class ServerList {
	static async getServerList() {
		const resp = await fetch('https://index.gats.io/api/find_instances', {
			method: 'POST'
		});
		
		if (resp.status !== 200) throw new GatsIndexServerError(`API returned non-200 status code: ${resp.status}`);
		else return resp.json();
	}

	static async getServer(region, gameType) {
		const servers = await ServerList.getServerList();

		return servers.filter((server) => server.region == region && server.game_type === gameType);
	}
}

