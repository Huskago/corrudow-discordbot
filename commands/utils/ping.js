const { EmbedBuilder } = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
  name: "ping",
  description: "Vérifier le ping du bot sur le serveur Discord.",
  category: "utils",
  onlyChannels: ["1001505559352180817"],
  onlyOwner: false,
  cooldown: 20,
  usage: "ping",
  examples: ["ping"],
  runInteraction: async (client, interaction) => {
    try {
      const pingMessage = await interaction.reply({ content: "En cours de ping...", fetchReply: true });

      const embed = await new EmbedBuilder()
        .setTitle("🏓 Pong!")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("#00ff00")
        .addFields(
          { name: "Latence", value: `${pingMessage.createdTimestamp - interaction.createdTimestamp}ms`, inline: true },
          { name: "Ping", value: `${client.ws.ping}ms`, inline: true },
          { name: "Uptime", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true }
        ) 
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
      await interaction.editReply({ content: "\u200b", embeds: [embed] });
    } catch (err) {
      Logger.error("Erreur lors du ping: " + err);
    } 
  },
};