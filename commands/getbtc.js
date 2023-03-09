const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getbtc')
		.setDescription('Replies with Bitcoin price!'),
        
	async execute(interaction) {
		await interaction.reply('');
	},
};