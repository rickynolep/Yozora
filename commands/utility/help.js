const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Baru pertama kali liat Yozora? kenalan yuks o(>ω<)ﾉ'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('Hawlo! Aku Yozora si kitsune!')
            .setColor('#9B7AAC')
            .setDescription(
                `Namaku diambil dari bahasa jepang yang berarti "Langit Malam", kenapa? karena aku membantu server ini pada saat banyak orang yang online dan saat itu adalah saat malam hari, ya walaupun kadang-kadang bisa siang sih... \n\n Oh ya mumpung kamu disini mau lihat lihat command ku dulu ga?`,
            );
        const commandEmbed = new EmbedBuilder()
            .setTitle('List Slash Command Yozora')
            .setColor('#9B7AAC')
            .setDescription(
                `Berikut ini adalah list command Yozora yang dapat kamu gunakan dimana saja!\n</help:1211927377257570348> ・ Yang saat ini kamu lihat\n</ping:1211927377257570350> ・ Untuk menguji kecepatan respon bot\n</intro:1211927377257570349> ・ Untuk melakukan perkenalan di server ini\n</disguise:1234064719334342706> ・ Mengirimkan pesan dan menyembunyikan identitasmu\n\n**Rikomunity Exclusive**\n</profile:1212637283581169664> ・ Membuat sebuat ringkasan mengenai informasi profil\n</confess:1211927377257570347> ・ Mengutarakan perasaanmu atau isi pikiranmu secara rahasia `,
            );
        const aboutMenu = new StringSelectMenuBuilder()
        .setCustomId('helpmenu')
        .setPlaceholder('Menu Help')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Tentang Yozora')
                .setDescription('Informasi mengenai Yozora si kitsune!')
                .setValue('about')
                .setEmoji('1206861664838877225')
                .setDefault(true),
            new StringSelectMenuOptionBuilder()
                .setLabel('Commands Yozora')
                .setDescription('List command Yozora yang bisa kamu gunakan!')
                .setValue('commands')
                .setEmoji('1218433304030613524')
        );
        const commandMenu = new StringSelectMenuBuilder()
        .setCustomId('helpmenu')
        .setPlaceholder('Menu Help')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Tentang Yozora')
                .setDescription('Informasi mengenai Yozora si kitsune!')
                .setValue('about')
                .setEmoji('1206861664838877225'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Commands Yozora')
                .setDescription('List command Yozora yang bisa kamu gunakan!')
                .setValue('commands')
                .setEmoji('1218433304030613524')
                .setDefault(true)
        );
        const aboutRow = new ActionRowBuilder()
            .addComponents(aboutMenu);
        const commandRow = new ActionRowBuilder()
            .addComponents(commandMenu);
        const helpReply = await interaction.reply({ embeds: [helpEmbed], components: [aboutRow] });
        module.exports = {helpReply, helpEmbed, commandEmbed, aboutRow, commandRow};
    },
};