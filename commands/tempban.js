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
       message.channel.send("Please mention a user to support ban")
       return;
    }
    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Need The **Support Team** Role to support ban users!`)
    
    if(!message.member.roles.cache.find(r => r.name == 'Support Team')) return message.channel.send(notallowed)
    let cooldown = 518400000;
    let TempBan = await db.fetch(`TempBan_${message.guild.id}_${user.id}`);

    if (TempBan !== null && cooldown - (Date.now() - TempBan) > 0) {
      
        let timeObj = ms(cooldown - (Date.now() - TempBan))

    let sEmbed = new Discord.MessageEmbed()
.setColor("RED")
    .setTitle("Already Banned!")
     .setDescription(`${user.tag} is already banned, they have **${timeObj.days}d ${timeObj.hours}hrs ${timeObj.minutes}min** remaning to be unbanned.`)
     message.channel.send(sEmbed)
     return;
    } else {
        db.set(`TempBan_${message.guild.id}_${user.id}`, Date.now());
        const bannedUser = new Discord.MessageEmbed()
        .setTitle("Support > Ban")
        .setDescription(`
        **Offender:** <@${user.id}>
        **Reason:** Support Rule violation read <#716318158948139008>.
        **Duration:** 6-day Action
        **Appealable:** No
        **Banned by:** <@${message.author.id}>
        `)
        message.channel.send(bannedUser)
    }

};

module.exports.help = {
    name: "sban",
    aliases: ["spban", "supportban"]
};