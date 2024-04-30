const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'disguise') {
            const disguiseResult = interaction.fields.getTextInputValue('disguiseMessage');
            const { disguiseChannel } = require("../commands/utility/disguise.js");
            try {
                const webhooks = await disguiseChannel.fetchWebhooks();
                const webhook = webhooks.find(wh => wh.token);
                if (!webhook) {
                    disguiseChannel.createWebhook({
                        name: 'Yozora Webhooks',
                        avatar: 'https://cdn.discordapp.com/avatars/1186804860482506762/957ca7391f5ce6db066cd290d52be118.webp?size=4096',
                    })
                    .then(webhook => console.log(`Created webhook ${webhook}`))
                    .catch(console.error);
                    await interaction.reply({ content: 'Webhooks baru saja diluncurkan untuk channel ini, Coba ulangi Pesannya ya!', ephemeral: true });
                }
                await webhook.send({
                    content: disguiseResult,
                    username: 'Anonymous',
                    avatarURL: 'https://media.discordapp.net/attachments/906057450451529748/1234079325637054515/disguise.png?ex=6630beef&is=662f6d6f&hm=5ec109a0919dd14b98c2b1e402207072772f2eba2d18c36896b08a3c1e108b75&=&format=webp&quality=lossless&width=670&height=670',
                });
                await interaction.reply({ content: 'Pesan dikirim!', ephemeral: true });
            } catch (error) {
                console.error('Error sending message via webhook:', error);
            }
            
            setTimeout(async () => {
                await interaction.deleteReply();
            }, 1000);
        }
    },
};
