const Discord = require('discord.js');
const index = require("../index");
const functions = require("../modules/functions");
const db = require('quick.db')
const ms = require('parse-ms');
const fetch = require('node-fetch')
module.exports.run = async(client, message, args, guild) => {
       	let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }

fetch(`https://api.falixnodes.net/v1/user/${user.id}`, { 
  headers: {
  Authorization: '[REMOVED]' 
}
})
    .then(res => res.json()) // expecting a json response
    .then(json => {
  console.log(json)
  const profile = new Discord.MessageEmbed()
  .setAuthor(user.username, user.displayAvatarURL(), 'https://client.falixnodes.net')
  .setThumbnail('https://cdn.discordapp.com/icons/710503370187735160/a_c84258e58f0d89be530fa6b5181a69b7.gif?size=1024')
  .setColor("#8a57fe")
  .addField("RAM:", json.extra_perks.ram + ' MB')
  .addField("Cores:", json.extra_perks.cores)
  .addField("Disk:", json.extra_perks.disk + ' MB')
  	.addFields(
		{ name: 'Falixcoins', value: `${json.falixcoins}` },
		{ name: '\u200B', value: '\u200B' },
    { name: 'Servers', value: json.extra_perks.servers, inline: true },
		{ name: 'Ports', value: json.extra_perks.ports, inline: true },
	)
  .setTimestamp()
  .setFooter('2020 FalixNodes Limited')
  message.channel.send(profile)
}).catch(err => {
  message.channel.send(err.message)
});
 
};

module.exports.help = {
    name: "nottesting",
    aliases: ["whyyyy", "rated"]
};