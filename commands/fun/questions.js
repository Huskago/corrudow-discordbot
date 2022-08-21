const { ApplicationCommandOptionType, BaseInteraction, Client } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

module.exports = {
  name: "questions",
  description: "Poser une question à un IA.",
  category: "fun",
  onlyChannels: ["1001505559352180817"],
  onlyOwner: false,
  cooldown: 20,
  usage: "questions <question>",
  examples: ["questions Le temps actuellement ?", "questions Comment appelez-vous ?"],
  options: [
    {
      name: "question",
      description: "La question à poser.",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openapi = new OpenAIApi(configuration);

    const question = interaction.options.getString("question");

    try {
      const reponse = await openapi.createCompletion({
        model: "text-davinci-002",
        prompt: question,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });

      interaction.reply(response);
    } catch (error) {
      interaction.reply("Une erreur est survenue.");
    }
  },
};