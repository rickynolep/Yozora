const { Events } = require("discord.js");
const { autoResponses } = require("../config.json");

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const autoResponse = autoResponses.find((ctx) => ctx.trigger == message.content.toLowerCase());
        if (autoResponse) await message.reply(autoResponse.response);
    }
}