const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

client.login(config.token);

const roleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Choose your preferred play style.')
	.setDescription('Select the appropriate reaction to add a identifier to your name in this server and the associated role.')
	.addFields(
		{ name: 'PvP (Player vs. Player)' , value: '🔴', inline: true },
		{ name: 'PvE (Player vs. Environment)', value: '🔵', inline: true },
	)

client.on('message', message => {
  if (message.content === '!start') {
    message.channel.send(roleEmbed).then(sentMessage => {
        sentMessage.react('🔴');
        sentMessage.react('🔵');
    });
  }
});