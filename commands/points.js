const Discord = require('discord.js');
const index = require("../index");
const functions = require("../modules/functions");
const db = require('quick.db')
const ms = require('parse-ms');
const fetch = require('node-fetch')
module.exports.run = async(client, message, args) => {
  	let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
 let FalixPoints = await db.fetch(`FalixPointsHuss_${user.id}`);
  let IQ = await db.fetch(`IQ_${user.id}`);
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
    .addField("Quick Notice:", `FalixPoints is an activity based economy system that has no value.\nYou could only purchase in-game items using FalixPoints as a thank you for your activeness in the FalixNodes Discord.`)
  .addFields(
		{ name: '\u200B', value: '\u200B' },
    { name: 'FalixCoins', value: json.falixcoins || 0, inline: true },
		{ name: 'FalixPoints', value: FalixPoints || 0, inline: true },
    { name: 'IQ', value: IQ || 0, inline:true},
	)
  .setTimestamp()
  .setFooter('2020 FalixNodes Limited')
  message.channel.send(profile)
}).catch(err => {
  message.channel.send(err.message)
});
    

};

module.exports.help = {
    name: "points",
    aliases: ["bal", "balance"]
};