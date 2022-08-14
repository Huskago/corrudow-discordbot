const { BaseInteraction, Client, EmbedBuilder  } = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
  name: "leaderboard",
  description: "Vérifier le classement du serveur.",
  category: "levels",
  onlyOwner: false,
  cooldown: 20,
  usage: "leaderboard",
  examples: ["leaderboard"],
  /**
   * 
   * @param {Client} client
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {

    const embed = new EmbedBuilder()
      .setTitle("**Classement du serveur**")
      .setDescription("**Voici le classement du serveur :**")
      .setColor("#0099ff")
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: interaction.member.user.username, icon_url: interaction.member.user.displayAvatarURL() });

    const users = await client.getUsers();

    
    const sortedUsers = users.sort((a, b) => b.level === a.level ? b.exp - a.exp : b.level - a.level).splice(0, 10).forEach(e => {
      embed.addFields({ name: `${e.username}`, value: `${e.level} | ${e.exp}/${client.getNeededExp(e.level)}` });
    });
    
      interaction.reply({ embeds: [embed], ephemeral: true });
  },
};