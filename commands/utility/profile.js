const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Membuat sebuah ringkasan mengenai informasi profilmu atau orang lain')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Profil orang yang ingin dicari')
                .setRequired(false)),
    async execute(interaction) {
        if (interaction.options.data.length > 0) {
            const user = interaction.options.getUser('user');
            await displayUser(interaction, user);
        } else {
            await displayUser(interaction, interaction.user);
        }
    },
};

async function displayUser(interaction, user) {
    const member = await interaction.guild.members.fetch(user);
    const options = { timeZone: 'Asia/Makassar', timeZoneName: 'short' };
    const profileEmbed = new EmbedBuilder()
        .setColor('#9B7AAC')
        .setTitle(`${user.username}'s Profile`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'Nama / Mention', value: `${user.username} ・ ${user.toString()}`, inline: true },
            { name: 'ID Akun', value: user.id, inline: true },
            { name: 'Link Avatar', value: `[Buka Browser](${user.displayAvatarURL({ dynamic: true })})`, inline: true },
            { name: 'Pembuatan Akun', value: user.createdAt.toLocaleString('id-ID', options), inline: true },
            { name: 'Bergabung pada Server', value: member.guild.joinedAt.toLocaleString('id-ID', options), inline: true },
        );
    await interaction.reply({ embeds: [profileEmbed] });
}
