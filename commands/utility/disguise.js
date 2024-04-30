const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { errorExecuting } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disguise')
        .setDescription('Mengirimkan pesan dan menyembunyikan identitasmu'),
    async execute(interaction) {
        try {
            const channel = interaction.channel.id
            const disguiseChannel = interaction.client.channels.cache.get(channel);
            module.exports = {disguiseChannel};
            const disguiseModal = new ModalBuilder()
                .setCustomId('disguise')
                .setTitle('Mode Penyamaran');
            const message = new TextInputBuilder()
                .setCustomId('disguiseMessage')
                .setLabel(`Kirim pesan di #${interaction.channel.name}:`)
                .setStyle(TextInputStyle.Paragraph);
            const row1 = new ActionRowBuilder().addComponents(message);
            disguiseModal.addComponents(row1);
            interaction.showModal(disguiseModal);
        } catch (error) {
            console.error('Error executing disguise command:', error);
            await interaction.reply({ content: errorExecuting, ephemeral: true });
        }
    },
};
