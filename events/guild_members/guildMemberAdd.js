const { Client, EmbedBuilder, GuildMember } = require("discord.js");

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  /**
   * 
   * @param {Client} client 
   * @param {GuildMember} member 
   */
  async execute(client, member) {
    const embed = new EmbedBuilder()
      .setTitle("Bienvenue sur le serveur !")
      .setDescription(`Bienvenue ${member.user.username}, si vous voulez vous inscrire sur le serveur, il vous suffit de faire la commande \`/verify\` avec le code donné par <@409778282800742408>  dans le salon <#1000811945571659917>!`);

    member.user.send({ embeds: [embed] });
  },
};