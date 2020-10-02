const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "$";

// inside a command, event listener, etc.
const pongEmbeded = new Discord.MessageEmbed()
	.setColor('#0099ff')
  .setTitle('Pong!');

const rankEmbeded = new Discord.MessageEmbed()
  .setColor('#00ffe8')
  .setDescription("Select an option to gain that rank")
  .addFields(
    { name: "PvP", value: "Select the 🔴 to be labeled for PvP" },
    { name: "PvE", value: "Select the 🔵 to be labeled for PvE" },
    { name: "Clear", value: "Select the ❌ to clear all ranks" }
  )
  .setTitle('Rank');

const rankFilter = (reaction, user) => {
  return ['🔴', '🔵', '❌'].includes(reaction.emoji.name) && !user.bot;
};
  

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if(command == "ping"){
    const timeTaken = Date.now() - message.createdTimestamp;
    pongEmbeded.setDescription(`This message had a latency of ${timeTaken}ms.`);
    message.reply(pongEmbeded);
  }

  if(command == "rank"){

    
    message.reply(rankEmbeded).then(sentMessage => {
      sentMessage.react("🔴");
      sentMessage.react("🔵");
      sentMessage.react("❌");

      const collector = sentMessage.createReactionCollector(rankFilter, { time: 30000 });

      collector.on('collect', (reaction, user) => {
        const userReactions = sentMessage.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

        try {
          for (const reaction of userReactions.values()) {
            reaction.users.remove(user.id);
          }
        } catch (error) {
          console.error('Failed to remove reactions.');
        }
        message.channel.send(`${user}, You've selected ${reaction.emoji.name}!`);
      });

    }).catch(err => {
      console.log(err);
    });
    
  }
});

client.login(config.token);