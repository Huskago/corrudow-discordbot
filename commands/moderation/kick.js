const { ApplicationCommandOptionType, BaseInteraction, Client } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Expulse un utilisateur",
  category: "moderation",
  onlyOwner: true,
  usage: "kick <@user> [raison]",
  examples: ["kick @user", "kick @user pour spam"],
  cooldown: 0,
  options: [
    {
      name: "user",
      description: "L'utilisateur à expulser",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "reason",
      description: "La raison du kick",
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
      interaction.reply({ content: "Vous devez mentionner un utilisateur à expulser !", ephemeral: true });
      return;
    }
    if (target.id === client.user.id) {
      interaction.reply({ content: "Je ne peux pas m'kick !", ephemeral: true });
      return;
    }
    if (target.id === client.config.ownerId) {
      interaction.reply({ content: "Je ne peux pas kick mon propriétaire !", ephemeral: true });
      return;
    }
    if (!reason) reason = "Aucune raison donnée";
    target.kick({ reason: reason });
    interaction.reply({ content: `${target.user.tag} a été expulsé pour la raison suivante : ${reason}`, ephemeral: true });
  },
};  