const { Client, BaseInteraction, InteractionType } = require('discord.js');
const Logger = require("../../utils/Logger");

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * 
     * @param {Client} client 
     * @param {BaseInteraction} interaction 
     * @returns 
     */
    async execute(client, interaction) {
        if (interaction.type === InteractionType.ApplicationCommand || interaction.isContextMenuCommand()) {
            const command = client.commands.get(interaction.commandName);
           if (!command) return interaction.reply('Cette commande n\'existe pas.');

           Logger.console(`- ${interaction.user.tag} a utilisé la commande ${command.name}`);

           if (command.onlyOwner) {
               if (client.config.ownerId != interaction.member.id && interaction.channel.id === "1000811945571659917" && command.name != "verify") return interaction.reply({ content: "Vous n'avez pas le droit d'envoyer de message dans ce channel, vous pouvez uniquement effectuer la commande `/verify <code>`.", ephemeral: true });
           }

           if (command.onlyChannels) {
               if (interaction.channel.id !== "1001594060047384696" && command.onlyChannels.length > 0 && !command.onlyChannels.includes(interaction.channel.id) && interaction.member.id != client.config.ownerId) return interaction.reply({ content: "Cette commande n'est pas disponible dans ce channel, mais est forcémment disponible dans le salon <#1001505559352180817> !", ephemeral: true });
           }

           if (command.onlyOwner && client.config.ownerId != interaction.member.id) return interaction.reply({ content: 'Vous n\'avez pas les permissions pour utiliser cette commande.', ephemeral: true });

           command.runInteraction(client, interaction);
        } 
        // else if (interaction.isButton()) {
        //     const button = client.buttons.get(interaction.customId);
        //     if (!button) return interaction.reply('Ce bouton n\'existe pas.');
        //     button.runInteraction(client, interaction);
        // } else if (interaction.isSelectMenu()) {
        //     const selectMenu = client.selects.get(interaction.customId);
        //     if (!selectMenu) return interaction.reply('Ce menu n\'existe pas.');
        //     selectMenu.runInteraction(client, interaction);
        // }
    },
};