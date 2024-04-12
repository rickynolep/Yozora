/**
 * @deprecated Why did you open this??
 */

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
            //.setThumbnail(interaction.guild.iconURL())
            .setDescription('Berikut ini adalah peraturan server yang harus diikuti agar tidak terkena masalah kedepannya, melanggar aturan berikut dapat mengakibatkan timeout, kick ataupun ban. jadi sebaiknya jangan dibantah ya!\n‎')
            .setImage('https://i.ibb.co/5rb3ypf/Rikomunity-Rules-Banner.gif')
            .addFields(
                { name: '💬・Aturan Umum', value: "- Hormati lawan bicaramu\n- Dilarang keras untuk meraid server ini\n- Jangan berlebihan dalam menggunakan kata kasar\n- Gunakanlah bot ditempatnya dengan baik dan benar\n- Tidak boleh menyindir tentang politik dan sebagainya\n- Tidak boleh membicarakan hal tidak senonoh (NSFW)\n- Tidak boleh rasis dalam bentuk ras, budaya, maupun agama\n- Member harus setidaknya 12 tahun untuk menghindari drama\n‎", inline: false },
                { name: '🎧・Aturan Voice', value: "- Jangan memutar lagu yang membuat pengguna lain menjadi tidak nyaman\n- Jika ada lebih dari dua pengguna dalam voice channel, jangan memutar musik ataupun mengganti musiknya tanpa izin mereka\n- Jika ada pengguna yang berisik, mengganggu, micnya bocor semacamnya, kamu bisa minta manajer menangani hal tersebut", inline: false },);
            await interaction.reply({ embeds: [rulesEmbed] });
        } else if (interaction.options.getSubcommand() === 'roles') {
            const rolesEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${interaction.guild.name} Roles`)
            .setThumbnail(interaction.guild.iconURL())
            .addFields();
            await interaction.reply({ embeds: [rolesEmbed] });
        }
    },
};