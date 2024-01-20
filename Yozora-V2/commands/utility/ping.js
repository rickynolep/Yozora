const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Menguji kecepatan respon bot'),
	async execute(interaction) {
		await interaction.reply(`Pong! Kecepatan respon bot saat ini ${interaction.client.ws.ping}ms`);
	},
};