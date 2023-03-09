const { SlashCommandBuilder } = require('discord.js');

const axios = require('axios');
const { cmcApi } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getbtc')
		.setDescription('Replies with Bitcoin price!'),
        
	async execute(interaction) {
		let price = null;

		let response = null;
		new Promise(async (resolve, reject) => {
			try {
			  response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC&convert=USD', {
				headers: {
				  'X-CMC_PRO_API_KEY': cmcApi,
				},
			  });
			} catch(ex) {
			  response = null;
			  // error
			  console.log(ex);
			  reject(ex);
			}
			if (response) {
			  // success
			  const json = response.data.data;
			  console.log(json.BTC[0].quote.USD.price);
			  resolve(json);
			}
				price = json.BTC[0].quote.USD.price;
		  });


		await interaction.reply(price);
	},
};