const { Client, BaseInteraction } = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
  name: "quests",
  description: "Affiche les quêtes disponibles.",
  category: "jdr",
  onlyOwner: false,
  cooldown: 20,
  usage: "quests [@user]",
  examples: ["quests", "quests @Huskago"],
  // options: [
  //   {
  //     name: "user",
  //     description: "L'utilisateur à qui afficher les quêtes.",
  //     type: ApplicationCommandOptionType.User,
  //     required: false,
  //   }
  // ],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    if (interaction.member.id !== "409778282800742408") {
      interaction.reply({ content: "Le système de quête est en cours de développement.", ephemeral: true });
    } else {
      const target = interaction.options.getUser("user") || interaction.member.user;
      const userId = target.id;

      const user = await client.getUser(userId);

      if (!user) return interaction.reply({ content: "L'utilisateur n'existe pas.", ephemeral: true });

      interaction.reply("Voici les quêtes disponibles :");
    }
  },
};