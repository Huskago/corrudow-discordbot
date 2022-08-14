const { ApplicationCommandOptionType, BaseInteraction, Client, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const Logger = require("../../utils/Logger");
const canvacord = require("canvacord");

module.exports = {
  name: "rank",
  description: "Vérifier le rang du joueur.",
  category: "levels",
  onlyOwner: false,
  cooldown: 20,
  usage: "rank [@user]",
  examples: ["rank", "rank @Huskago"],
  options: [
    {
      name: "user",
      description: "Le joueur à vérifier.",
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
    if (!target) {
      const userId = interaction.member.id;
      const user = await client.getUser(userId);
      if (!user) {
        Logger.error(`Impossible de récupérer l'utilisateur ${userId}`);
        return interaction.reply("Impossible de récupérer l'utilisateur.");
      }
      const level = user.level;
      const exp = user.exp;
      const neededExp = client.getNeededExp(level);

      const users = await client.getUsers();
      console.log();

      const rank = new canvacord.Rank()
        .setAvatar(interaction.member.displayAvatarURL())
        .setLevel(level)
        .setRank(users.sort((a, b) => b.level === a.level ? b.exp - a.exp : b.level - a.level).findIndex(e => e.id === userId) + 1)
        .setCurrentXP(exp)
        .setRequiredXP(neededExp)
        .setStatus(interaction.member.presence.status)
        .setProgressBar(interaction.member.displayHexColor, "COLOR")
        .setUsername(interaction.member.user.username)
        .setDiscriminator(interaction.member.user.discriminator);

      rank.build()
          .then(data => {
              const attachment = new AttachmentBuilder(data, "RankCard.png");
              interaction.reply({ files: [attachment], ephemeral: true });
          });
    } else if (target.id === "1000814220067209219") {
      interaction.reply({ content: "Désolé, j'ai un niveau trop élevé ;b", ephemeral: true });
    } else {
      const targetMember = interaction.guild.members.cache.get(target.id);
      const user = await client.getUser(targetMember.id);
      if (!user) {
        Logger.error(`Impossible de récupérer l'utilisateur ${targetId}`);
        return interaction.reply({ content: "Impossible de récupérer l'utilisateur.", ephemeral: true });
      }
      const level = user.level;
      const exp = user.exp;
      const neededExp = client.getNeededExp(level);

      const users = await client.getUsers();

      const rank = new canvacord.Rank()
        .setAvatar(targetMember.displayAvatarURL())
        .setLevel(level)
        .setRank(users.sort((a, b) => b.level === a.level ? b.exp - a.exp : b.level - a.level).findIndex(e => e.id === targetMember.id) + 1)
        .setCurrentXP(exp)
        .setRequiredXP(neededExp)
        .setStatus(targetMember.presence.status || "offline")
        .setProgressBar(targetMember.displayHexColor, "COLOR")
        .setUsername(targetMember.user.username)
        .setDiscriminator(targetMember.user.discriminator); 

      rank.build()
          .then(data => {
              const attachment = new AttachmentBuilder(data, "RankCard.png");
              interaction.reply({ files: [attachment], ephemeral: true });
          });
    }
  },
};