const { SlashCommandBuilder } = require('discord.js');
const { cmcApi } = require('../config.json');
const axios = require('axios');

async function getBTCPrice() {
	const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC&convert=USD', {
	  headers: {
		'X-CMC_PRO_API_KEY': cmcApi,
	  },
	});
	const price = response.data.data.BTC[0].quote.USD.price;
	return price;
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getbtc')
		.setDescription('Replies with Bitcoin price!'),
        
	async execute(interaction) {
		const price = await getBTCPrice();
		await interaction.reply("USD " + price.toString());
	},
};

