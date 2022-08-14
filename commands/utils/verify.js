const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const Logger = require("../../utils/Logger");

module.exports = {
  name: "verify",
  description: "Vérifier l'utilisateur avec le code donné.",
  category: "utils",
  onlyOwner: false,
  cooldown: 10,
  usage: "verify <code>",
  examples: ["verify bdhifkjd17", "verify jtid25nnf"],
  options: [
    {
      name: "code",
      description: "Le code à vérifier",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  runInteraction: async (client, interaction) => {
    if (interaction.channel.id !== "1000811945571659917") return interaction.reply({ content: "Cette commande n'est pas disponible dans ce channel.", ephemeral: true });
    
    let userData = await client.getUser(interaction.member.id);
    
    if (!userData) return interaction.reply({ content: "Vous n'avez pas de compte sur ce serveur ! Si vous en vouliez un, demandez en mp à <@409778282800742408>.", ephemeral: true });
    
    if (interaction.member.roles.cache.has("1000810183779438793") && userData.verified) return interaction.reply({ content: "Vous n'avez pas besoin de vérifier votre compte sur ce serveur !", ephemeral: true });

    const code = interaction.options.getString('code');
    await interaction.reply({ content: "En cours de vérification...", fetchReply: true });

    if (code != userData.code) return await interaction.editReply({ content: "Le code que vous avez entré est incorrect !", ephemeral: true });

    await interaction.editReply({ content: "Vérification terminée !", fetchReply: true });
    const embed = await new EmbedBuilder()
      .setTitle("Vérification terminée !")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("#00ff00")
      .addFields(
        { name: "Utilisateur", value: interaction.user.username, inline: true },
        { name: "ID", value: interaction.user.id, inline: true },
        { name: "Groupe", value: userData.group, inline: false }
      )
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    await interaction.editReply({ embeds: [embed] });

    setTimeout(async () => {
      const role = interaction.guild.roles.cache.get("1000810183779438793");
      if (role) {
        try {
          await interaction.member.roles.add(role);
          await client.updateUser(interaction.member.id, { verified: true });
        } catch (err) {
          Logger.error(err);
        }
      };
      switch (userData.group) {
        case "A":
          await interaction.member.roles.add("1000811663135604867");
          break;
        case "B":
          await interaction.member.roles.add("1000811779863101676");
          break;
        case "C":
          await interaction.member.roles.add("1000998581399994388");
          break;
      }
    }, 5000);
  },
};