const { Client, BaseInteraction } = require("discord.js");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
  name: "notify",
  description: "Notifie si il y a une nouvelle annonce sur le serveur ou une nouvelle séance de jeu de rôle.",
  category: "utils",
  onlyOwner: false,
  cooldown: 20,
  usage: "notify [on/off]",
  examples: ["notify", "notify on", "notify off"],
  options: [
    {
      name: "enabled",
      description: "Activer ou désactiver la notification.",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "On",
          value: "on"
        },
        {
          name: "Off",
          value: "off"
        }
      ]
    }
  ],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const enabled = interaction.options.getString("enabled");
    
    if (!enabled) {
      if (interaction.member.roles.cache.has("1001485128087896125")) {
        interaction.reply({ content: "Vos notifications sont activés ! :white_check_mark:", ephemeral: true });
      } else {
        interaction.reply({ content: "Vos notifications sont désactivés ! :x:", ephemeral: true });
      }
    } else if (enabled === "on") {
      if (interaction.member.roles.cache.has("1001485128087896125")) {
        interaction.reply({ content: "Vos notifications sont déjà activés ! :white_check_mark:", ephemeral: true });
      } else {
        interaction.member.roles.add("1001485128087896125");
        interaction.reply({ content: "Vos notifications sont activés ! :white_check_mark:", ephemeral: true });
      }
    } else if (enabled === "off") {
      if (!interaction.member.roles.cache.has("1001485128087896125")) {
        interaction.reply({ content: "Vos notifications sont déjà désactivés ! :x:", ephemeral: true });
      } else {
        interaction.member.roles.remove("1001485128087896125");
        interaction.reply({ content: "Vos notifications sont désactivés ! :x:", ephemeral: true });
      }
    }
  },
};