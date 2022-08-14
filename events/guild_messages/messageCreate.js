const { Client, Message } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    once: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    async execute(client, message) {
        if (message.author.bot) return;

        if (message.channel.id === '1000811945571659917') {
            message.delete();
            return message.author.send("Vous n'avez pas le droit d'envoyer de message dans ce channel, vous pouvez uniquement effectuer la commande `/verify <code>`.");
        }

        const userId = message.author.id;
        const user = await client.getUser(userId);

        if (!user) return;

        const expCd = Math.floor(Math.random() * 19) + 1;
        const expToAdd = Math.floor(Math.random() * 4) + 1;

        if (expCd >= 8 && expCd <= 11) {
            await client.updateUser(userId, { exp: user.exp + expToAdd });
        };

        if ((user.exp + expToAdd) >= client.getNeededExp(user.level)) {
            if (user.level >= 999) return;
            saveExp = user.exp + expToAdd - client.getNeededExp(user.level);
            message.reply(`Vous avez atteint le niveau ${user.level + 1} !`).then(message => {
                setTimeout(() => message.delete(), 5000);
            });
            await client.updateUser(userId, { level: user.level + 1, exp: saveExp });
        };
        
        if (!message.content.startsWith(client.config.prefix)) return;
        
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        if (commandName.length == 0) return;

        let command = client.commands.get(commandName);

        if (!command) return;
        
        if (command.onlyOwner && client.config.ownerId != message.author.id) return message.reply('Vous n\'avez pas les permissions pour utiliser cette commande.');

        command.run(client, message, args);
    },
};