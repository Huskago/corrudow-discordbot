const { BaseInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rlovecalc",
  description: "Calcule la probabilité d'amour avec une personne au hasard",
  category: "fun",
  onlyChannels: ["1001505559352180817"],
  onlyOwner: false,
  cooldown: 20,
  usage: "rlovecalc",
  examples: ["rlovecalc"],
  /**
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const user = interaction.member.user;
    const target = interaction.guild.members.cache.random().user;

    await interaction.reply({ content: `Calcul en cours...`, fetchReply: true })

    const love = Math.random() * 100;
    const lovePercent = Math.floor(love);
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    const embed = new EmbedBuilder()
      .setTitle(`Probabilité d'amour entre ${user.username} et un random qui est ${target.username}`)
      .setDescription(`${user.username} et ${target.username} ont une probabilité d'amour de ${lovePercent}% !`)
      .setColor("#00ff00")
      .addFields(
        { name: "Probabilité d'amour", value: `${lovePercent}%`, inline: true },
        { name: "Niveau d'amour", value: `${loveLevel}`, inline: false }
      )
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    await interaction.editReply({ content: "\u200b", embeds: [embed] });
  },
};