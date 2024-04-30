const { ChannelType, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { errorTargetChannel, errorExecuting, errorInvalidColor, confessChannelId } = require('../../config.json');

function getColorHex(colorName) {
    const isHexCode = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorName);
    if (isHexCode) {
        return colorName;
    }
    return null;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confess')
        .setDescription('Mengutarakan perasaanmu atau isi pikiranmu secara rahasia')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Utarakan isi hatimu disini!')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Judul dari confess mu, jika dibiarkan kosong maka akan menjadi "Confession!"')
                .setRequired(false))
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('Mau memberikan foto pada pesan ini agar lebih spesial? Bwoleh kok!')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Mengganti warna garis embed menggunakan kode hex')
                .setRequired(false)),
    async execute(interaction) {
        const content = interaction.options.getString('content');
        const title = interaction.options.getString('title') || 'Confession!';
        const colorInput = interaction.options.getString('color') || '#9B7AAC';
        const color = getColorHex(colorInput);

        if (!color) {
            await interaction.reply({ content: errorInvalidColor, ephemeral: true });
            return;
        }

        try {
            const targetChannel = interaction.client.channels.cache.get(confessChannelId);
            if (targetChannel?.type !== ChannelType.GuildText) { await interaction.reply({ content: errorTargetChannel, ephemeral: true }); return;}
            const attachment = interaction.options.getAttachment('image');
            let imageUrl;

            if (attachment) {
                new AttachmentBuilder(attachment.url);
                imageUrl = attachment.url;
            }

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(content)
                .setColor(color);
                if (imageUrl) {embed.setImage(imageUrl);
            }

            let confessMessage = await targetChannel.send({ embeds: [embed] });
            await confessMessage.startThread({
                name: title,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD'
            });
            await interaction.reply({ content: 'Terkirim! Jangan terlalu terbuka yah biar gak ketauan <a:Shiggy:1206861664838877225>', ephemeral: true });
        } catch (error) {
            console.error('Error executing confess command:', error);
            await interaction.reply({ content: errorExecuting, ephemeral: true });
        }
    },
};
