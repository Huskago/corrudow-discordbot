const { promisify } = require("util");
const { glob } = require("glob");
const pGlob = promisify(glob);
const Logger = require("../Logger");

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async commandFile => {
        const command = require(commandFile);

        if (!command.name) return Logger.warn(`Commande non chargée: ajoutez un nom à votre commande ↓\nFichier -> ${commandFile}`);

        if (!command.description) return Logger.warn(`Commande non chargée: ajoutez une description à votre commande ↓\nFichier -> ${commandFile}`);

        if (!command.category) return Logger.warn(`Commande non chargée: ajoutez une catégorie à votre commande ↓\nFichier -> ${commandFile}`);

        client.commands.set(command.name, command);

        Logger.command(`- ${command.name}`);
    });
};