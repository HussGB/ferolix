/* jshint esversion: 8 */
const Discord = require('discord.js');
const index = require("../index");
const functions = require("../modules/functions");

module.exports.run = async(client, message, args) => {
  const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${message.author.tag} Requested Transcript`)
	.setAuthor(message.author.tag, message.author.avatarURL, 'https://falixnodes.net')
  .setDescription("ID:\n" + message.author.id)
  .setTimestamp()
  message.author.send("Your transcript is currently in the queue for being reviewed! I'll send them over once they're ready!")
  client.channels.cache.get("718779624829485087").send(exampleEmbed)
};

module.exports.help = {
    name: "request",
    aliases: ["request-transcript", "transcripts"]
};