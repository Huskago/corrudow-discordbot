const { ApplicationCommandOptionType, BaseInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "deluser",
  description: "Supprime un utilisateur à la base de données",
  category: "admin",
  onlyOwner: true,
  cooldown: 0,
  options: [
    {
      name: 'userid',
      description: 'L\'id de l\'utilisateur à ajouter',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  /**
   * 
   * @param {Client} client
   * @param {BaseInteraction} interaction 
   * @returns 
   */
  runInteraction: async (client, interaction) => {
    const userId = interaction.options.getString('userid');

    const user = await client.getUser(userId);

    if (!user) return interaction.reply({content: `L'utilisateur ${userId} n'existe pas !`, ephemeral: true});

    const userName = user.username;
    const group = user.group;
    const verified = user.verified;

    const poll = await interaction.reply({ content: `Voulez-vous réellement supprimer le compte ${userName} (${userId})`, fetchReply: true  });

    await poll.react("✅");
    await poll.react("❌");

    const filter = (reaction, user) => {
      return ['✅', '❌'].includes(reaction.emoji.name) && user.id === interaction.author.id;
    }

    const collector = poll.createReactionCollector(filter, { time: 60000 });

    collector.on('collect', async (reaction, user) => {
      if (reaction.emoji.name === '✅') {
        poll.reactions.removeAll();
        await interaction.editReply({ content: `Suppression en cours...`, fetchReply: true });
        await client.deleteUser(userId);
        const embed = await new EmbedBuilder()
          .setTitle("Suppression terminée !")
          .setThumbnail(client.user.displayAvatarURL())
          .setColor("#00ff00")
          .addFields(
            { name: "ID", value: userId, inline: true },
            { name: "Nom", value: userName, inline: true },
            { name: "\u200b", value: "\u200b", inline: true },
            { name: "Groupe", value: group, inline: true },
            { name: "Verifié", value: verified ? "✅" : "❌", inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
          )
          .setTimestamp()
          .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
        await interaction.editReply({ content: "\u200b", embeds: [embed], fetchReply: true });
      }
      if (reaction.emoji.name === '❌') {
        poll.reactions.removeAll();
        await interaction.editReply({ content: "Suppression annulée !", fetchReply: true });
      }
      collector.stop();
    }
    );
  },
};