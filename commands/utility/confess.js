const { ChannelType, SlashCommandBuilder } = require('discord.js');
const { channelNotFound } = require('../../config.json');
const targetChannelId = '1129380135699755098';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confess')
		.setDescription('Mengutarakan perasaanmu atau isi pikiranmu secara rahasia')
		.addStringOption(option =>
			option.setName('content')
				.setDescription('Utarakan isi hatimu disini!')
				.setRequired(true)),
	async execute(interaction) {
		const content = interaction.options.getString('content');
		try {
			const targetChannel = interaction.client.channels.cache.get(targetChannelId);
			if (targetChannel?.type !== ChannelType.GuildText) {
				await interaction.reply({ content: channelNotFound, ephemeral: true });
				return;
			}

			await targetChannel.send(` Confession: ${content}`);
			await interaction.reply({ content: 'Terkirim! Jangan terlalu terbuka yah biar gak ketauan ', ephemeral: true });
		}
		catch (error) {
			console.error('Error executing confess command:', error);
			await interaction.reply({ content: 'error. ya.. lagi', ephemeral: true });
		}
	},
};
