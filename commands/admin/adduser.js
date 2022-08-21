const { ApplicationCommandOptionType, BaseInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "adduser",
  description: "Ajoute un utilisateur à la base de données",
  category: "admin",
  onlyOwner: true,
  cooldown: 0,
  options: [
    {
      name: 'userid',
      description: 'L\'id de l\'utilisateur à ajouter',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'group',
      description: 'Le groupe de l\'utilisateur',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: 'A',
          value: 'a',
        },
        {
          name: 'B',
          value: 'b',
        },
        {
          name: 'C',
          value: 'c',
        },
        {
          name: 'Spectactor',
          value: 'spectactor',
        },
        {
          name: 'MJ',
          value: 'mj',
        },
      ]
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
    const group = interaction.options.getString('group').toUpperCase();

    const userName = interaction.guild.members.cache.get(userId).user.username;

    const user = await client.getUser(userId);
    
    if (user) return interaction.reply({content: `L'utilisateur ${userId} existe déjà !`, ephemeral: true});

    await interaction.reply({ content: "En cours de création...", fetchReply: true });

    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var stringLength = 20;

    function pickRandom() {
        return possible[Math.floor(Math.random() * possible.length)];
    }

    var code = Array.apply(null, Array(stringLength)).map(pickRandom).join('');

    await client.createUser(userId, userName, code, group)

    await interaction.editReply({ content: "Création terminée !", fetchReply: true });
    const embed = await new EmbedBuilder()
      .setTitle("Création terminée !")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("#00ff00")
      .addFields(
        { name: "ID", value: userId, inline: true },
        { name: "Nom", value: userName, inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
        { name: "Group", value: group, inline: true },
        { name: "Code", value: `||${code}||`, inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
      )
      .setTimestamp()
      .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    await interaction.editReply({ embeds: [embed] });
    client.emit("guildMemberAdd", interaction.guild.members.cache.get(userId));
  },
};