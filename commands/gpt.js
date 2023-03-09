const { SlashCommandBuilder } = require('discord.js');
const { openApi } = require('../config.json')
const { Configuration, OpenAIApi } = require("openai");

async function gptPrompt(input) {
    const configuration = new Configuration({
        apiKey: openApi,
      });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 2048,
      });

      const answer = completion.data.choices[0].text;
      return answer;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gpt')
		.setDescription('Replies with chatGPT ai!')
        .addStringOption(option =>
            option.setName('user_input')
            .setDescription('Enter your prompt.')
            .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const question = interaction.options.getString('user_input');
        const output = await gptPrompt(question);
		await interaction.followUp(output);
	},
};