const { ApplicationCommandOptionType, BaseInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "admin-quests",
  description: "Ajoute ou retire des quêtes à un utilisateur.",
  category: "admin",
  onlyOwner: true,
  cooldown: 0,
  options: [
    {
      name: 'command',
      description: 'La commande à exécuter',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: 'add',
          value: 'add',
        },
        {
          name: 'remove',
          value: 'remove',
        }
      ]
    },
    {
      name: 'user',
      description: 'L\'utilisateur à qui ajouter ou retirer les quêtes',
      type: ApplicationCommandOptionType.User,
      required: true
    }
  ],
  /**
   * 
   * @param {Client} client
   * @param {BaseInteraction} interaction 
   * @returns 
   */
  runInteraction: async (client, interaction) => {
  } 
};