const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Membuat sebuah embed preset dan embed custom')
        .addSubcommand(subcommand =>
            subcommand.setName('rules')
                .setDescription('Membuat embed yang berisi peraturan server Rikomunity'))
        .addSubcommand(subcommand =>
            subcommand.setName('roles')
                .setDescription('Membuat embed yang berisi informasi tentang roles di Rikomunity')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'rules') {
            const rulesEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${interaction.guild.name} Rules`)
            .setThumbnail(interaction.guild.iconURL())
            .setDescription('Berikut ini adalah peraturan server yang harus diikuti agar tidak terkena masalah kedepannya, melanggar aturan berikut dapat mengakibatkan timeout, kick ataupun ban. jadi sebaiknya jangan dibantah ya!\n‎')
            .addFields(
                { name: '💬・Aturan Umum', value: `
                ➥ Hormati lawan bicaramu
                ➥ Jangan berlebihan dalam menggunakan kata kasar
                ➥ Member harus setidaknya 12 tahun untuk menghindari drama
                ➥ Tidak boleh membicarakan hal yang tidak senonoh seperti NSFW
                ➥ Tidak boleh rasis dalam bentuk ras, budaya, maupun agama
                ➥ Tidak boleh membahas tentang politik dan sebagainya
                ➥ Dilarang keras untuk meraid server ini, hormatilah saya ownernya :(
                ➥ Dilarang untuk menyalahgunakan bot server / menggunakan bot pada channel yang salah\n‎`, inline: false },
                { name: '🎧・Aturan Voice', value: `
                ➥ Hormati lawan bicaramu
                ➥ Jangan berlebihan dalam menggunakan kata kasar
                ➥ Member harus setidaknya 12 tahun untuk menghindari drama
                ➥ Tidak boleh membicarakan hal yang tidak senonoh seperti NSFW
                ➥ Tidak boleh rasis dalam bentuk ras, budaya, maupun agama
                ➥ Tidak boleh membahas tentang politik dan sebagainya
                ➥ Dilarang keras untuk meraid server ini, hormatilah saya ownernya :(
                ➥ Dilarang untuk menyalahgunakan bot server / menggunakan bot pada channel yang salah`, inline: false },
            );
            await interaction.reply({ embeds: [rulesEmbed] });
        } else if (interaction.options.getSubcommand() === 'roles') {
            const rolesEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${interaction.guild.name} Roles`)
            .setThumbnail(interaction.guild.iconURL())
            .addFields(/* Add your fields here */);
            await interaction.reply({ embeds: [rolesEmbed] });
        }
    },
};