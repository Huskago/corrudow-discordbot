const { ApplicationCommandOptionType, BaseInteraction, Client } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Supprime un nombre de messages spécifié sur un salon ou un utilisateur",
  category: "moderation",
  onlyOwner: true,
  usage: "clear <number> [@target]",
  examples: ["clear 10", "clear 10 @user"],
  cooldown: 5,
  options: [
    {
      name: "message",
      description: "Le nombre de messages à supprimer",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
      max_value: 100
    },
    {
      name: "target",
      description: "L'utilisateur à supprimer les messages",
      type: ApplicationCommandOptionType.User,
      required: false
    }
  ],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const amountToDelete = interaction.options.getInteger("message");
    if (amountToDelete > 100 || amountToDelete < 0) return interaction.reply({ content: "Vous devez entrer un nombre entre 0 et 100.", ephemeral: true });
    const target = interaction.options.getMember("target");

    const messagesToDelete = await interaction.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filteredTargetMessages = [];
      (await messagesToDelete).filter(message => {
        if (message.author.id === target.id && amountToDelete > i) {
          filteredTargetMessages.push(message);
          i++;
        }
      });

      await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
        interaction.reply({ content: `J'ai supprimé ${messages.size} messages de ${target.user.tag} !`, ephemeral: true });
      });
    } else {
      await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
        interaction.reply({ content: `J'ai supprimé ${messages.size} messages !`, ephemeral: true });
      });
    }
  },
};