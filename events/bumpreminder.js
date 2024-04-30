const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.id === '302050872383242240' && message.embeds.length > 0 && message.embeds[0].data.description.includes("Bump done!")) {
            const bumpedEmbed = new EmbedBuilder()
                .setTitle(`Server di Bump!`)
                .setThumbnail(`https://cdn.discordapp.com/icons/1117809432932393131/a_ff2fb2e0deaf8f380e5a9538a4625baa.gif?size=4096`)
                .setDescription(`Makasih banget udah ngebump server ini agar terlihat bagi pengunjung lain ${message.interaction.user.globalName}! kami akan mengingatkanmu 2 jam lagi.\n\nOh ya, sekalian dong vote sama bump di Discadia!`)
                .setColor(`#9B7AAC`)
                .setTimestamp();
            const discadiaButton = new ButtonBuilder()
                .setLabel('Vote Rikomunity di Discadia')
                .setURL('https://discadia.com/vote/rikomunity')
                .setStyle(ButtonStyle.Link);
            const discadiaRow = new ActionRowBuilder()
			    .addComponents(discadiaButton);
            await message.channel.send({ embeds: [bumpedEmbed], components: [discadiaRow]});
            const countdown = 2 * 60 * 60 * 1000;
            setTimeout(async () => {
                const remindbumpEmbed = new EmbedBuilder()
                    .setTitle(`Waktunya Bump server!`)
                    .setColor(`#9B7AAC`)
                    .setThumbnail(`https://cdn.discordapp.com/icons/1117809432932393131/a_ff2fb2e0deaf8f380e5a9538a4625baa.gif?size=4096`)
                    .setDescription(`${message.interaction.user.globalName}! Kamu sudah bisa bump server ini lagi lho.. Ayo </bump:947088344167366698>!`);
                await message.channel.send({ content:`2 jam telah berlalu, <@${message.interaction.user.id}>`, embeds: [remindbumpEmbed] });
            }, countdown);
        }
    },
};