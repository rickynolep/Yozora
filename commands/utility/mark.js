const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mark')
		.setDescription('Menandai suatu thread (Hanya untuk mod)')
		.addStringOption(option =>
			option.setName('thread_id')
				.setDescription('ID thread yang akan ditandai')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('tag')
				.setDescription('Tag yang akan ditambahkan')
				.setRequired(true)),
	async execute(interaction) {
		// Get the thread ID and tag from the interaction options
		const threadId = interaction.options.getString('thread_id');
		const tag = interaction.options.getString('tag');

		try {
			// Fetch the thread by its ID
			const thread = await interaction.client.channels.fetch(threadId);

			console.log('Fetched channel type:', thread.type);
			// Log the fetched channel's type

			// Check if the provided channel is a thread
			if (thread.type !== 'GUILD_PUBLIC_THREAD' && thread.type !== 'GUILD_PRIVATE_THREAD') {
				await interaction.reply({ content: 'Hanya thread yang bisa ditandai.', ephemeral: true });
				return;
			}

			// Add the tag to the thread's metadata
			thread.setMetadata({ tag });

			await interaction.reply({ content: `Tag "${tag}" berhasil ditambahkan ke thread.`, ephemeral: true });
		}
		catch (error) {
			console.error('Error marking thread:', error);
			await interaction.reply({ content: 'Terjadi kesalahan saat menambahkan tag ke thread. Pastikan ID thread valid.', ephemeral: true });
		}
	},
};
