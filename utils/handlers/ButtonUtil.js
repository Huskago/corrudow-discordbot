const { promisify } = require("util");
const { glob } = require("glob");
const pGlob = promisify(glob);
const Logger = require("../../utils/Logger");

module.exports = async (client) => {
  (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async (buttonFile) => {
    const button = require(buttonFile);
    if (button.name) return Logger.warn(`Bouton non fonctionnel: ajouter un nom à votre bouton ↓\nFichier -> ${buttonFile}.`);
    client.buttons.set(button.name, button);
  });
};