const { Events } = require('discord.js');
const { autoResponses } = require('../config.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;
		const words = message.content.toLowerCase().split(' ');
		const firstWord = words[0];
		const secondWord = words[1];
		const autoResponse = autoResponses.find((ctx) => ctx.trigger.toLowerCase() === firstWord || ctx.trigger.toLowerCase() === secondWord);
		if (autoResponse) {
			await message.reply(autoResponse.response);
		}
	},
};