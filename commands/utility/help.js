const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { launchType } = require('../../vault.json');

let currentMode;
if (launchType === 'Local') { currentMode = 'Local (Computer Ricky)'; }
else if (launchType === 'Server') { currentMode = 'Server (Pylexnode Server)'; }
else { currentMode = 'Unknown'; }

const helpEmbed = new EmbedBuilder()
	.setTitle('Hawlo! Aku Yozora, Bot Maskot Server Ini!')
	.setColor('#0099ff')
	.setDescription(
		`Namaku diambil dari bahasa jepang yang berarti "Langit Malam", kenapa? karena aku membantu server ini pada saat banyak orang yang online dan saat itu adalah saat malam hari, ya walaupun kadang-kadang bisa siang sih...\n\n Current Mode: ${currentMode}`,
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Baru pertama kali liat Yozora? kenalan yuks o(>ω<)ﾉ'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });
	},
};
