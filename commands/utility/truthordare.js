const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('tord')
		.setDescription('Memulai permainan truth or dare (BETA)')
        .addStringOption(option =>
			option.setName('truth')
            .setDescription('Memulai permainan truth (tanpa dare)')
            .setRequired(false))
        .addStringOption(option =>
            option.setName('dare')
            .setDescription('Memulai permainan dare (tanpa truth)')
            .setRequired(false)),
	async execute(interaction) {
        try {
        let tord = ''; let server = interaction.guild; let user = interaction.user.globalName;
        const truthParts = [
            {text: `Kamu sedang chat di server Discord, buatlah hanya satu Truth or Dare\n${user} untuk menyebutkan orang tersebut,\n${server} untuk menyebutkan server saat ini`},
            {text: `Output: Kalo kamu lagi pacaran, apa satu hal yang bikin kamu putus?`},
            {text: `Output: Siapa orang yang paling kamu sayangi?`},
            {text: `Output: Apa anime favoritmu?`},
            {text: `Output: Berapa umurmu yang sebenarnya?`},
            {text: `Output: Siapa teman terdekatmu di ${server}?`},
            {text: `Output: Sebutkan satu rahasia yang belum pernah kamu ceritakan kepada siapa pun!`},
            {text: `Output: Apa hal paling gila yang pernah kamu lakukan?`},
            {text: `Output: Sebutkan tiga hal yang kamu paling takuti!`},
            {text: `Output: Apa hal paling memalukan yang pernah terjadi padamu?`},
            {text: `Output: Siapa crush-mu?`},
            {text: `Output: Apa hal paling berani yang pernah kamu lakukan?`},
            {text: `Output: Apa lagu favoritmu saat ini?`},
            {text: `Output: Apa bakat tersembunyimu?`},
            {text: `Output: Apa kenangan masa kecil favoritmu?`},
            {text: `Output: Sebutkan satu fakta yang diketahui sedikit orang tentang kamu!`},
            {text: `Output: Sebutkan orang yang paling ingin kamu temui di ${server}!`},
            {text: `Output: Siapa orang di ${server} yang paling ingin kamu ajak berpetualang?`},
            {text: `Output: Siapa orang di ${server} yang ingin kamu jadikan pacar?`},
            {text: `Output: Apa hal paling spontan yang pernah kamu lakukan?`},
        ];
        const genAI = new GoogleGenerativeAI(process.env.aitoken);
        await interaction.deferReply();
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContentStream({ contents: [{ role: "user", parts: truthParts }] });
        for await (const chunk of result.stream) { const chunkText = chunk.text(); tord = chunkText;}
        const tordEmbed = new EmbedBuilder()
        .setColor('#9B7AAC')
        .setTitle(`Truth or Dare!`)
        .setDescription(tord)
        .setFooter({text: '🚧・Fitur ini menggunakan AI yang sedang dikembangkan'});
        await interaction.editReply({ embeds: [tordEmbed] });
        } catch (error) {
            if (error.message.includes('blocked due to SAFETY')) {
                await interaction.editReply({ content: "AI mengandung unsur sensitif, Ulangi lagi yah..." });
                setTimeout(async () => {
                    await interaction.deleteReply();
                }, 2000);
            } else {
                console.error('Error executing tord command:', error);
            }
        }
	},
};