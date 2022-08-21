const {  } = require("discord.js");
const { Client, BaseInteraction, EmbedBuilder } = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
  name: "worldanvil",
  description: "Envoie le lien worldanvil du jeu de rôle",
  category: "jdr",
  onlyOwner: false,
  cooldown: 20,
  usage: "worldanvil",
  examples: ["worldanvil"],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("CorruDow - WorldAnvil")
      .setURL("https://www.worldanvil.com/w/corrudow-huskago")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("**Le [worldanvil du jeu de rôle CorruDow](https://www.worldanvil.com/w/corrudow-huskago), vous pourrez voir les informations suivants :**\n*- [La map du continent](https://www.worldanvil.com/w/corrudow-huskago/map/4f2ccd64-1971-4031-a407-758514e48bc8)\n- Les articles accessibles à tous le monde*")
      .setColor("#00ff00")
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};