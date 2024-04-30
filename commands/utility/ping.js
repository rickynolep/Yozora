const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Menguji kecepatan respon bot'),
	async execute(interaction) {
        const latencyraw = (interaction.createdTimestamp - Date.now())
        const latency = (latencyraw / 1000).toFixed(1);
        await interaction.reply(`Pong! Kecepatan respon bot saat ini ${latency} detik dengan Ping ${Math.round(interaction.client.ws.ping)} ms`);
	},
};