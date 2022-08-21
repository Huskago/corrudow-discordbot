const { ApplicationCommandOptionType, BaseInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "lovecalc",
  description: "Calcule la probabilité d'amour entre deux personnes",
  category: "fun",
  onlyChannels: ["1001505559352180817"],
  onlyOwner: false,
  cooldown: 20,
  usage: "lovecalc <@user> [@user]",
  examples: ["lovecalc @Huskago", "lovecalc @Huskago @Huskago2"],
  options: [
    {
      name: "user",
      description: "L'utilisateur à qui on veut calculer la probabilité d'amour",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "user2",
      description: "L'utilisateur à qui on veut calculer la probabilité d'amour",
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
    const target = interaction.options.getUser("user");
    const target2 = interaction.options.getUser("user2");

    if (!target2 && interaction.user.id !== target.id) {
      const user = interaction.member.user;

      await interaction.reply({ content: `Calcul en cours...`, fetchReply: true })

      const love = Math.random() * 100;
      const lovePercent = Math.floor(love);
      const loveIndex = Math.floor(love / 10);
      const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

      const embed = new EmbedBuilder()
        .setTitle(`Probabilité d'amour entre ${user.username} et ${target.username}`)
        .setDescription(`${user.username} et ${target.username} ont une probabilité d'amour de ${lovePercent}% !`)
        .setColor("#00ff00")
        .addFields(
          { name: "Probabilité d'amour", value: `${lovePercent}%`, inline: true },
          { name: "Niveau d'amour", value: `${loveLevel}`, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
      await interaction.editReply({ content: "\u200b", embeds: [embed] });
    } else if (target2 && target.id !== target2.id) {
      await interaction.reply({ content: `Calcul en cours...`, fetchReply: true })

      const love = Math.random() * 100;
      const lovePercent = Math.floor(love);
      const loveIndex = Math.floor(love / 10);
      const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

      const embed = new EmbedBuilder()
        .setTitle(`Probabilité d'amour entre ${target.username} et ${target2.username}`)
        .setDescription(`${target.username} et ${target2.username} ont une probabilité d'amour de ${lovePercent}% !`)
        .setColor("#00ff00")
        .addFields(
          { name: "Probabilité d'amour", value: `${lovePercent}%`, inline: true },
          { name: "Niveau d'amour", value: `${loveLevel}`, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
      await interaction.editReply({ content: "\u200b", embeds: [embed] });
    } else {
      await interaction.reply({ content: `Calcul en cours...`, fetchReply: true })

      const love = Math.random() * 100;
      const lovePercent = Math.floor(love);
      const loveIndex = Math.floor(love / 10);
      const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

      const embed = new EmbedBuilder()
        .setTitle(`Probabilité d'amour entre ${target.username} et de lui même`)
        .setDescription(`${target.username} a une probabilité d'amour de ${lovePercent}% !`)
        .setColor("#00ff00")
        .addFields(
          { name: "Probabilité d'amour", value: `${lovePercent}%`, inline: true },
          { name: "Niveau d'amour", value: `${loveLevel}`, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
      await interaction.editReply({ content: "\u200b", embeds: [embed] });
    }
  },
};