const { ApplicationCommandOptionType, BaseInteraction, Client } = require("discord.js");

module.exports = {
  name: "emit",
  description: "Émet un événement Discord",
  category: "admin",
  onlyOwner: true,
  cooldown: 0,
  options: [
    {
      name: 'event',
      description: 'L\'événement à émettre',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "GuildMemberAdd",
          value: "guildMemberAdd"
        },
        {
          name: "GuildMemberRemove",
          value: "guildMemberRemove"
        }
      ]
    }
  ],
  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  runInteraction: async (client, interaction) => {
    const eventChoices = interaction.options.getString('event');

    if (eventChoices === 'guildMemberAdd') {
      client.emit('guildMemberAdd', interaction.member);
      interaction.reply({ content: "Event GuildMemberAdd émit !", ephemeral: true });
    } else {
      if (eventChoices === 'guildMemberRemove') {
        client.emit('guildMemberRemove', interaction.member);
        interaction.reply({ content: "Event GuildMemberRemove émit !", ephemeral: true });
      }
    }
  },
};