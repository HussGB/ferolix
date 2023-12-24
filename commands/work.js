const Discord = require('discord.js');
const index = require("../index");
const functions = require("../modules/functions");
const db = require('quick.db')
const ms = require('parse-ms');

module.exports.run = async(client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author
     
    }
    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Need The **Support Team** Role to run this command!`)
    
   // if(!message.member.roles.cache.find(r => r.name == 'Support Team')) return message.channel.send(notallowed)
    let cooldown = 1800000;
    let WorkCD = await db.fetch(`WorkCD_${message.guild.id}_${user.id}`);

    if (WorkCD !== null && cooldown - (Date.now() - WorkCD) > 0) {
      
        let timeObj = ms(cooldown - (Date.now() - WorkCD))

    let sEmbed = new Discord.MessageEmbed()
.setColor("RED")
    .setTitle("A cooldown has appeared!")
     .setDescription(`${user.tag} is currently on a cooldown of ${timeObj.hours}hrs ${timeObj.minutes}min** **${timeObj.seconds}s`)
     message.channel.send(sEmbed)
     return;
    } else {
        db.set(`WorkCD_${message.guild.id}_${user.id}`, Date.now());
      db.add(`FalixPointsHuss_${message.author.id}`, 1);
        const doneWork = new Discord.MessageEmbed()
        .setTitle("Guild > Earn")
        .setDescription(`You have earned 1 FalixCoin.`)
        message.channel.send(doneWork)
    }

};

module.exports.help = {
    name: "work",
    aliases: ["claim", "earn"]
};