const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;
        if (interaction.customId === 'helpmenu') {
            const selectedValue = interaction.values[0];
            const { helpReply, helpEmbed, commandEmbed, aboutRow, commandRow } = require('../commands/utility/help.js');
            if (selectedValue === 'about') {
                helpReply.edit({ embeds: [helpEmbed], components: [aboutRow] });
            } else if (selectedValue === 'commands') {
                helpReply.edit({ embeds: [commandEmbed], components: [commandRow] });
            }
            await interaction.deferUpdate();
        }
    },
};
