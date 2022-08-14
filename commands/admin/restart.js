const { BaseInteraction, Client } = require("discord.js");

module.exports = {
  name: "restart",
  description: "Redémarre le bot.",
  category: "admin",
  onlyOwner: true,
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    await interaction.reply({ content: "Redémarrage en cours...", ephemeral: true, fetchReply: true }).then(async msg => {
      await require("child_process").exec("pm2 restart corrudow-assistant");

      try {
        await msg.edit({ content: "Redémarrage terminé !", ephemeral: true, fetchReply: true });
      } catch(err) {
        await interaction.editReply({ content: "Redémarrage terminé !", ephemeral: true, fetchReply: true });
      }
    })
  },
};