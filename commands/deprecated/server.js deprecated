// why did you open this? this is deprecated bro......

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rikomunity')
        .setDescription('Membuat informasi yang tertera mengenai server Rikomunity')
        .addSubcommand(subcommand =>
            subcommand.setName('rules')
                .setDescription('Membuat informasi mengenai peraturan Rikomunity '))
        .addSubcommand(subcommand =>
            subcommand.setName('roles')
                .setDescription('Membuat informasi mengenai Roles dalam Rikomunity')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'rules') {
            await interaction.channel.send({ content: "# Rules // Rikomunity\nBerikut ini adalah peraturan server yang harus diikuti agar tidak terkena masalah kedepannya.\nmelanggar aturan berikut dapat mengakibatkan timeout, kick ataupun ban. jadi sebaiknya jangan dibantah ya!\n\n## 💬・Aturan Umum\n- Hormati lawan bicaramu\n- Dilarang keras untuk meraid server ini\n- Jangan berlebihan dalam menggunakan kata kasar\n- Gunakanlah bot ditempatnya dengan baik dan benar\n- Tidak boleh menyindir tentang politik dan sebagainya\n- Tidak boleh membicarakan hal tidak senonoh (NSFW)\n- Tidak boleh rasis dalam bentuk ras, budaya, dan agama\n- Member harus setidaknya 12 tahun untuk menghindari drama\n\n## 🎧・Aturan Voice\n- Jangan memutar lagu yang membuat pengguna lain menjadi tidak nyaman\n- Jika ada pengguna yang berisik, mengganggu, micnya bocor semacamnya, kamu bisa minta manajer menangani hal tersebut"});
            await interaction.channel.send({ files: ['assets/RikomunityRulesBanner.gif'] });
        } else if (interaction.options.getSubcommand() === 'roles') {
            const rolesEmbed = new EmbedBuilder()
            await interaction.channel.send({ content: "# Roles // Rikomunity\n"})
            await interaction.channel.send({ files: ['assets/RikomunityRolesBanner.gif'] });
        }
    },
};