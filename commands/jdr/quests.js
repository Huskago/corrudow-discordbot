const { Client, BaseInteraction } = require("discord.js");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
  name: "quests",
  description: "Affiche les quêtes disponibles.",
  category: "jdr",
  onlyOwner: false,
  cooldown: 20,
  usage: "quests [@user]",
  // examples: ["quests", "quests @Huskago"],
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
    interaction.reply({ content: "Le système de quête est en cours de développement.", ephemeral: true });
    // const target = interaction.options.getUser("user");
    // if (!target) {
    //   const user = await client.getUser(interaction.member.id);
    //   if (!user) {
    //     Logger.error(`Impossible de récupérer l'utilisateur ${interaction.member.id}`);
    //     return interaction.reply("Impossible de récupérer l'utilisateur.");
    //   }
    //   quests = user.quests;
    //   console.log(quests);
    // }
  },
};