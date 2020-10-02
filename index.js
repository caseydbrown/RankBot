const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

client.login(config.token);

//insert logic here