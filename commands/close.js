/* jshint esversion: 8 */

const index = require("../index");
const functions = require("../modules/functions");
const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js')
module.exports.run = async(client, message, args) => {

  if(message.channel.name.includes(`priority-`)) {

    const closedEmbed = new Discord.MessageEmbed()
    .setTitle("Ticket Closed")
    .setDescription(`
    **__FALIXNODES TICKET INFORMATION__**
    **__________________________________**
    **Closed by:** <@${message.author.id}>
    **Reason:** Automated response: Changes have been logged and issued.
    __This message is sent to inform that your support ticket has reached the end of it's conversation. We hope you're satisifed!__
    `)
    .setTimestamp()
    .setFooter("Huss Ticket Manager 2020")
    message.channel.send(closedEmbed)
    message.author.send(closedEmbed)

    if(client.config.logging.onTicketClose === true) {
        let logChannel = functions.channels.cache_findByID(message, client.config.logging.channel);

        logChannel.send(await functions.messages(message, "logTicketClose", message.channel, message.author, null));
    }
    console.log("Ticket Deleted")
    setTimeout(function(){
        message.channel.delete();
    }, 5000);
       
  } else {
  
  
    if(!message.channel.name.includes(`ticket-`)) {
        return functions.messages(message, "notTicketChannel");
    }


    message.channel.send("Please wait whilst we prepare this ticket for `closure`. The waiting may take up to 10 seconds.")
    // generate transcript
   // let transcript = await functions.generate.transcript(message);


    if(client.config.logging.onTicketClose === true) {
        let logChannel = functions.channels.cache_findByID(message, client.config.logging.channel);

        logChannel.send(await functions.messages(message, "logTicketClose", message.channel, message.author, null));
    }
    console.log("Deleted Ticket")
    setTimeout(function(){
        message.channel.delete();
    }, 5000);
  }
};

module.exports.help = {
    name: "close",
    aliases: ["end"]
};