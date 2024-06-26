const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function getColorHex(colorName) {
	const isHexCode = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorName);
	if (isHexCode) {
		return colorName;
	}
	return null;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('intro')
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
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.user;
		const name = interaction.options.getString('name');
		const hobby = interaction.options.getString('hobby') || '-';
		const location = interaction.options.getString('location') || '-';
		const description = interaction.options.getString('description');
		const colorInput = interaction.options.getString('color') || '#9B7AAC';
		const color = getColorHex(colorInput);
		if (!color) {
			await interaction.reply({ content: 'Sorry masbro, Warnanya tidak valid. Pastikan kamu menggunakan [kode hex](https://www.google.com/search?q=Pemilih+warna) yang valid. Contoh: #123ABC, atau kosongkan saja kalau mau pakai warna default', ephemeral: true });
			return;
		}

		const introEmbed = new EmbedBuilder()
			.setColor(color)
			.setTitle('Perkenalkan')
			.setThumbnail(user.displayAvatarURL())
			.setDescription(`Nama: ${name}\nHobi: ${hobby}\nDaerah asal: ${location}\n\n${description}`);
		await interaction.reply({ embeds: [introEmbed] });
	},
};
