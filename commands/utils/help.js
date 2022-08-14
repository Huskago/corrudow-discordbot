const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const commandFolder = readdirSync("./commands");

module.exports = {
  name: "help",
  description: "Affiche la liste des commandes disponibles.",
  category: "utils",
  onlyOwner: false,
  usage: "help [command]",
  examples: ["help", "help ping"],
  cooldown: 10,
  options: [
    {
      name: "command",
      description: "Affiche la description d'une commande spécifique.",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  runInteraction: async (client, interaction) => {
    const commandName = interaction.options.getString("command");

    if (!commandName) {
      const noArgsEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .addFields({ name: `Liste des commandes`, value: `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`/help <command>\`` });
        
      for (const category of commandFolder) {
        if ((category === "admin" || category === "moderation") && interaction.member.id != client.config.ownerId) continue;
        noArgsEmbed.addFields({ name: `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`, value: `\`${client.commands.filter(command => command.category == category.toLowerCase()).map(command => command.name).join(', ')}\``});
      }

      return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
    }

    const command = client.commands.get(commandName);
    if (!command) return interaction.reply({ content: `La commande \`${commandName}\` n'existe pas.`, ephemeral: true });

    const argsEmbed = new EmbedBuilder()
      .setColor("#00ff00")
      .addFields(
        { name: `Description de la commande \`${commandName}\``, value: `${command.description}` 
        },
        {
          name: `Catégorie`, value: `${command.category}`
        },
        {
          name: `Usage`, value: `\`${command.usage}\``
        }
    );
    if (command.examples.length > 1) {
      argsEmbed.addFields({ name: `Exemples`, value: `\`${command.examples.join(', ')}\`` });
    }

    return interaction.reply({ embeds: [argsEmbed], ephemeral: true });
  }
};