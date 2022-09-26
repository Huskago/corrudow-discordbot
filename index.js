const { Client, Collection, Partials } = require("discord.js");
require('dotenv').config()
const { version } = require('./package.json');
const mongoose = require("mongoose");
const client = new Client({ intents: 3276799, partials: [Partials.Message, Partials.Channel, Partials.Reaction] });
const Logger = require("./utils/Logger");

client.config = require("./config.json");
client.version = version;

["commands", "buttons", "selects"].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

require("./utils/Functions")(client);

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code} !`); });

process.on('uncaughtException', (err, origin) => {
  Logger.error(`UNCAUGHT_EXCEPTION: ${err}`);
  console.error(`Origine: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => { 
  Logger.warn(`UNHANDLED_REJECTION: ${reason}`); 
  console.log(promise);
});

process.on('warning', (...args) => { Logger.warn(...args); });

mongoose.connect(process.env.DATABASE_URI, {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
}).then(() => { Logger.client("- connecté à la base de données"); })
  .catch(err => { Logger.error(err); });

client.login(process.env.TOKEN);