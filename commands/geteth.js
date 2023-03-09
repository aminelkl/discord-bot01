const { SlashCommandBuilder } = require('discord.js');
const { cmcApi } = require('../config.json');
const axios = require('axios');

async function getETHPrice() {
	const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH&convert=USD', {
	  headers: {
		'X-CMC_PRO_API_KEY': cmcApi,
	  },
	});
	const price = response.data.data.ETH[0].quote.USD.price;
	return price;
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('geteth')
		.setDescription('Replies with Ethereum price!'),
        
	async execute(interaction) {
		const price = await getETHPrice();
		await interaction.reply("USD " + price.toString());
	},
};