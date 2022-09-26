const { ActivityType, Client } = require('discord.js');

require('dotenv').config()
const Logger = require("../../utils/Logger");

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        // Logger.client("- Prêt à être utilisé");
        console.log("Bot Starting...");

        const devGuild = client.guilds.cache.get('1000768975963164803');
        devGuild.commands.set(client.commands.map(command => command));

        const statuses = [
            { name: "de la musique avec les Shadow", type: ActivityType.Listening },
            { name: "à aider Huskago", type: ActivityType.Playing },
            { name: `la version ${process.env.npm_package_version}`, type: ActivityType.Watching },
            { name: "la salope de tiberius", type: ActivityType.Playing },
            { name: "Huskago, notre dieu à tous !", type: ActivityType.Watching },
            { name: "Huskago, notre dieu à tous !", type: ActivityType.Listening },
            { name: `${(client.guilds.cache.get("1000768975963164803").roles.cache.get("1000810183779438793").members.filter(member => !member.user.bot).size - 1).toFixed()} joueurs !`, type: ActivityType.Listening },
        ];

        setInterval(() => {
            var randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setPresence({
                activities: [{ name: randomStatus.name, type: randomStatus.type }],
                status: 'online'
            });
        }, 15000);
    },
};