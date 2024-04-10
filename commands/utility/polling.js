const { SlashCommandBuilder } = require('@discordjs/builders');
const { ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const activeCollectors = new Map();

function generateBar(percentage1, percentage2) {
    const redLength = Math.round(percentage1 / 10);
    const blueLength = Math.round(percentage2 / 10);
    let indicatorBar = '';
    for (let i = 0; i < 11; i++) {
        if (i < redLength) {
            indicatorBar += '<:RM:1213064848062152745>';
        } else if (i === redLength) {
            indicatorBar += '<:RMB:1213064867821518888>';
        } else {
            indicatorBar += '<:BM:1213064883307028530>';
        }
    }
    return indicatorBar;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('polling')
        .setDescription('Membuat atau mengakhiri polling atau voting [Deprecated]')
        .addSubcommand(subcommand =>
            subcommand.setName('start')
                .setDescription('Membuat sebuah polling atau voting [Deprecated]')
                .addStringOption(option =>
                    option.setName('title')
                        .setDescription('Judul dari poling')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('red')
                        .setDescription('Polling pertama dengan warna merah')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('blue')
                        .setDescription('Polling kedua dengan warna biru')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('durations')
                        .setDescription('Durasi polling berlangsung dalam menit, default 20 menit')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand.setName('end')
                .setDescription('Mengakhiri polling yang sedang aktif [Deprecated]')),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'end') {
            const collector = activeCollectors.get(interaction.guildId);
            if (collector) {
                collector.stop('Polling ended');
                activeCollectors.delete(interaction.guildId);
                const embed = new EmbedBuilder()
                    .setTitle('Polling Diakhiri')
                    .setDescription('Polling sudah diakhiri')
                    .setColor('#ff0000');
                await interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                await interaction.reply({ content: 'Tidak ada polling yang sedang aktif untuk diakhiri', ephemeral: true });
            }
            return;
        }

        if (interaction.options.getSubcommand() === 'start') {
            const title = interaction.options.getString('title');
            const red = interaction.options.getString('red');
            const blue = interaction.options.getString('blue');
            const voteDurations = interaction.options.getString('durations') || '20';
            const currentTime = new Date();
            const endTime = new Date(currentTime.getTime() + voteDurations * 60000);
            const formattedEndTime = endTime.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
            const userVotes = new Map();
            let percentage1 = 50;
            let percentage2 = 50;
            let initialBar = generateBar(percentage1, percentage2);
            const embed = new EmbedBuilder()
                .setTitle(title)
                .addFields({ name: 'Progress voting saat ini', value: `${percentage1.toFixed(2)}% - ${percentage2.toFixed(2)}%\n<:LE:1213064825488277544>${initialBar}<:RE:1213064897353621504>`})
                .setColor('#0099ff')
                .setFooter({ text: `Voting akan berakhir dalam ${voteDurations} menit ・ ${formattedEndTime} WITA`});
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('red')
                        .setLabel(red)
                        .setStyle(4),
                    new ButtonBuilder()
                        .setCustomId('blue')
                        .setLabel(blue)
                        .setStyle(1)
                );

            const initialMessage = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });
            const filter = (i) => i.isButton() && i.message.id === initialMessage.id;
            const collector = initialMessage.createMessageComponentCollector({ filter, time: voteDurations * 60 * 1000 });
            activeCollectors.set(interaction.guildId, collector);

            collector.on('collect', async (buttonInteraction) => {
                if (buttonInteraction.isButton()) {
                    if (userVotes.has(buttonInteraction.user.id)) {
                        await buttonInteraction.reply({ content: "Hey, kamu sudah voting!", ephemeral: true });
                        return;
                    }
                    userVotes.set(buttonInteraction.user.id, buttonInteraction.customId);
                    const totalVotes = userVotes.size;
                    const redVotes = Array.from(userVotes.values()).filter((value) => value === 'red').length;
                    const blueVotes = totalVotes - redVotes;
                    percentage1 = (redVotes / totalVotes) * 100;
                    percentage2 = (blueVotes / totalVotes) * 100;
                    const indicatorBar = generateBar(percentage1, percentage2);
                    embed.setFields({ name: 'Progress voting saat ini', value: `${percentage1.toFixed(2)}% - ${percentage2.toFixed(2)}%\n<:LE:1213064825488277544>${indicatorBar}<:RE:1213064897353621504>`});
                    await initialMessage.edit({ embeds: [embed] });
                    buttonInteraction.deferUpdate();
                }
            });

            collector.on('end', async () => {
                const indicatorBar = generateBar(percentage1, percentage2);
                embed.setFooter({ text: 'Polling telah berakhir!'});
                embed.setFields({ name: 'Hasil voting', value: `${percentage1.toFixed(2)}% - ${percentage2.toFixed(2)}%\n<:LE:1213064825488277544>${indicatorBar}<:RE:1213064897353621504>`});
                await initialMessage.edit({ embeds: [embed] });
                activeCollectors.delete(interaction.guildId);
                const disabledButton = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('red')
                                .setLabel(red)
                                .setStyle(4)
                                .setDisabled(true),
                            new ButtonBuilder()
                                .setCustomId('blue')
                                .setLabel(blue)
                                .setStyle(1)
                                .setDisabled(true));
                await initialMessage.edit({ components: [disabledButton] });
            });
        }
    },
};
