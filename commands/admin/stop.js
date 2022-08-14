const { BaseInteraction, Client } = require("discord.js");

module.exports = {
  name: "stop",
  description: "Arrête le bot.",
  category: "admin",
  onlyOwner: true,
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    await interaction.reply({ content: "Arrêt en cours...", ephemeral: true, fetchReply: true }).then(async msg => {
      await require("child_process").exec("pm2 stop corrudow-assistant");

      try {
        await msg.edit({ content: "Arrêt terminé !", ephemeral: true, fetchReply: true });
      } catch(err) {
        await interaction.editReply({ content: "Arrêt terminé !", ephemeral: true, fetchReply: true });
      }
    })
  },
};