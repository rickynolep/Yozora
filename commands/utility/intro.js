const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function getColorHex(colorName) {
	// Check if the input is a valid hex code
	const isHexCode = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorName);

	// If it's a valid hex code, return it directly
	if (isHexCode) {
		return colorName;
	}

	// If not a valid hex code, return null
	return null;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('intro')
		.setDescription('Manage introductions')
		.addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Membuat sebuah perkenalan yang sudah diembed dan dikirim secara otomatis')
				.addStringOption(option =>
					option.setName('name')
						.setDescription('Siapakah Namamu?')
						.setRequired(true))
				.addStringOption(option =>
					option.setName('description')
						.setDescription('ada kata kata perkenalan? contoh: salken')
						.setRequired(true))
				.addStringOption(option =>
					option.setName('age')
						.setDescription('Berapa umurmu?')
						.setRequired(false))
				.addStringOption(option =>
					option.setName('hobby')
						.setDescription('Apa Hobimu?')
						.setRequired(false))
				.addStringOption(option =>
					option.setName('color')
						.setDescription('Mengganti warna garis embed menggunakan kode hex')
						.setRequired(false))
				.addStringOption(option =>
					option.setName('location')
						.setDescription('Dari mana kamu?')
						.setRequired(false))),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === 'create') {
			const name = interaction.options.getString('name');
			const age = interaction.options.getString('age') || '-';
			const hobby = interaction.options.getString('hobby') || '-';
			const location = interaction.options.getString('location') || '-';
			const description = interaction.options.getString('description');
			const colorInput = interaction.options.getString('color') || '#0099ff';

			// Convert color name to hex value if a color name is provided
			const color = getColorHex(colorInput);
			if (!color) {
				await interaction.reply({ content: 'Warna tidak valid. Pastikan Anda menggunakan [kode hex](https://www.google.com/search?q=Pemilih+warna) yang valid.', ephemeral: true });
				return;
			}

			const introEmbed = new EmbedBuilder()
				.setColor(color)
				.setTitle('Perkenalkan')
				.setDescription(`Nama: ${name}\nUmur: ${age}\nHobi: ${hobby}\nDaerah asal: ${location}\n\n${description}`);

			await interaction.reply({ embeds: [introEmbed] });
		}
	},
};
