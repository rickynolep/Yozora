const { Events } = require('discord.js');
const { onlineChannelId } = require('../config.json');

let currentMode;
if (process.env.launchType === 'Server') {
	currentMode = 'Server - Yozora berjalan dengan stabil';
}
else {
	currentMode = 'Unknown - ada masalah pada peluncuran Yozora. Beberapa fungsi system dimatikan';
}

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log("\x1b[33m%s\x1b[0m", `Logged in as ${client.user.tag} on ${process.env.launchType}`);
		if (process.env.launchType !== 'Local') {
			const channel = client.channels.cache.get(onlineChannelId);
			if (channel) {
				channel.send(`<a:zrikomunity:1218433304030613524> ・Yozora online dalam mode ${currentMode}`);
			}
			else {
				console.error(`Invalid channel ID: ${onlineChannelId}`);
			}
		}
	},
};
