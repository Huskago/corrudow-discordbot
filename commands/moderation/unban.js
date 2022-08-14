const { ApplicationCommandOptionType, BaseInteraction, Client } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Debannit un utilisateur",
  category: "moderation",
  onlyOwner: true,
  usage: "unban <@user>",
  examples: ["unban @user"],
  cooldown: 0,
  options: [
    {
      name: "user",
      description: "L'utilisateur à debannir",
      type: ApplicationCommandOptionType.User,
      required: true
    }
  ],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const target = interaction.options.getMember("user");
    if (!target) {
      interaction.reply({ content: "Vous devez mentionner un utilisateur à débannir !", ephemeral: true });
      return;
    }
    if (target.id === client.user.id) {
      interaction.reply({ content: "Je ne peux pas m'débannir !", ephemeral: true });
      return;
    }
    if (target.id === client.config.ownerId) {
      interaction.reply({ content: "Je ne peux pas débannir mon propriétaire !", ephemeral: true });
      return;
    }
    target.unban();
    interaction.reply({ content: `${target.user.tag} a été débanni`, ephemeral: true });
  },
};  