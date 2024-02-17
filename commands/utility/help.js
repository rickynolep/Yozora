const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { launchType } = require('../../vault.json');

// Determine the current mode based on launchType
let currentMode;
if (launchType === 'Local') { currentMode = 'Local (Computer)'; }
else if (launchType === 'Server') { currentMode = 'Server (Pylexnode Server)'; }
else { currentMode = 'Unknown'; }

// Create the help embed with the current mode
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
