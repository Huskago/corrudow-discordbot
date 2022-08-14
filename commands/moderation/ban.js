const { ApplicationCommandOptionType, BaseInteraction, Client } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bannit un utilisateur",
  category: "moderation",
  onlyOwner: true,
  usage: "ban <@user> [raison]",
  examples: ["ban @user", "ban @user pour spam"],
  cooldown: 0,
  options: [
    {
      name: "user",
      description: "L'utilisateur à bannir",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "reason",
      description: "La raison du ban",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const target = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    if (!target) {
      interaction.reply({ content: "Vous devez mentionner un utilisateur à bannir !", ephemeral: true });
      return;
    }
    if (target.id === client.user.id) {
      interaction.reply({ content: "Je ne peux pas m'bannir !", ephemeral: true });
      return;
    }
    if (target.id === client.config.ownerId) {
      interaction.reply({ content: "Je ne peux pas bannir mon propriétaire !", ephemeral: true });
      return;
    }
    if (!reason) reason = "Aucune raison donnée";
    target.ban({ reason: reason });
    interaction.reply({ content: `${target.user.tag} a été banni pour la raison suivante : ${reason}`, ephemeral: true });
  },
};  