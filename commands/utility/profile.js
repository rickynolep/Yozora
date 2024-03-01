const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Displays user profile information')
        .addSubcommand(subcommand =>
            subcommand.setName('me')
                .setDescription('Displays your own profile'))
        .addSubcommand(subcommand =>
            subcommand.setName('user')
                .setDescription('Displays the profile of a specified user')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('User to display profile')
                        .setRequired(true))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'me') {
            await displayUserProfile(interaction, interaction.user);
        } else if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('user');
            await displayUserProfile(interaction, user);
        }
    },
};

async function displayUserProfile(interaction, user) {
    const member = await interaction.guild.members.fetch(user);

    // Get the current time in WITA timezone
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Makassar', timeZoneName: 'short' };

    const profileEmbed = new EmbedBuilder()
        .setColor('#0099ff')
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
