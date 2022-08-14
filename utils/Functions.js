const { User } = require("../models/index");
const Logger = require("./Logger");
require('dotenv').config()

module.exports = client => {
  client.getUser = async userId => {
    return await User.findOne({ id: userId });
  };

  client.getUsers = async () => {
    return await User.find();
  };

  client.createUser = async (userId, userName, code, group) => {
    const createUser = await new User({
      id: userId,
      username: userName,
      code: code,
      group: group,
    });

    createUser.save().then(user => Logger.client(`Nouveau utilisateur ${user.username} (Id: ${user.id}; Group: ${user.group})`)).catch(err => Logger.error(err));
  }

  client.deleteUser = async userId => {
    return await User.deleteOne({ id: userId }).then(user => Logger.client(`Utilisateur ${user.username} (Id: ${user.id}; Group: ${user.group}) supprimé`)).catch(err => Logger.error(err));
  }

  client.updateUser = async (userId, settings) => {
    let userData = await client.getUser(userId);
    if (typeof userData != "object") userData = {};
    for (const key in settings) {
      if (userData[key] != settings[key]) userData[key] = settings[key];
    }
    return userData.updateOne(settings);
  }
  
  client.getNeededExp = (level) => {
    return (level * level * 100)
  }

  client.clean = async (text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;

    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));

    text = text.replaceAll(process.env.TOKEN, "[REDACTED]");

    return text;
  }
}