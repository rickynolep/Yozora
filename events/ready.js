const { Events } = require('discord.js');
const { onlineChannelId } = require('../config.json');
const { launchType } = require('../vault.json');

let currentMode;
if (launchType === 'Server') {
	currentMode = 'Server / Pylexnode Server - Yozora berjalan dengan stabil';
}
else {
	currentMode = 'Unknown - ada masalah pada peluncuran Yozora. Beberapa fungsi system dimatikan';
}

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		if (launchType !== 'Local') {
			const channel = client.channels.cache.get(onlineChannelId);
			if (channel) {
				channel.send(`<a:rikomunity:1208619104924340276>・Yozora online dalam mode ${currentMode}`);
			}
			else {
				console.error(`Invalid channel ID: ${onlineChannelId}`);
			}
		}
	},
};
