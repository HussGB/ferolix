/* jshint esversion: 8 */

const index = require("../index");
const functions = require("../modules/functions");
const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms');
const pageemo = ["🎉", "💳", "❌"];
const pages = [
  {
    title: "» FalixNodes Tickets",
    description: `
Please react to the following to get your ticket categorised.

🎉 » To claim rewards (invite/social rewards)
💳 » For account/billing purposes
❌ » To lock the prompt

*Staff do not get prioritised tickets*
`
  },


  {
    title: "1st Page",
    description: `
Hi, this is a bug. Report this to a staff
`
  },
    {
    title: "2nd Page",
    description: `
Welcome to the 2nd (this is a  bug too) (remind huss to fix it kthx)
`
  }
];

let page = 0;
module.exports.run = async(client, message, args) => {
  let cooldown = 518400000;
  let TempBan = await db.fetch(`TempBan_${message.guild.id}_${message.author.id}`);
  if(message.member.roles.cache.find(r => r.name == 'Support Team')) {
    
 let embed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`
Please react to the following to get your ticket categorised.

🎉) To claim rewards (invite/social rewards)
💳) For account/billing purposes
❌) To lock the prompt

**Loading... This may take up to 4 seconds.**
`);
  //.setDescription("");

  message.channel.send(`<@${message.author.id}>`, embed).then(msg => {
    function reactArrows(arrow) {
      if (arrow === 3) {
        embed.setColor("RANDOM");
        embed.setTitle(pages[0].title);
        embed.setDescription(pages[0].description);
        msg.edit(`<@${message.author.id}>`, embed);
        return;
      }
      msg.react(pageemo[arrow]).then(_ => {reactArrows(arrow + 1);}).catch(e => console.error(`Reaction Error: ${e}`));
    }
    function handleReaction(reaction) {
                    if(message.author.id !== reaction.users.cache.last().id){

        return;
      }
      // console.log(`${reaction.emoji.name} from ${reaction.users.last().username}`);
      console.log(message.author.id)
     
      reaction.remove(reaction.users.cache.last()).catch(e => {
        //if (e.code === 50013) reaction.message.channel.send("I need the 'Manage Messages' permission in order to work properly!");
      });
      const rid = pageemo.indexOf(reaction.emoji.name);
      if (rid === 0) {
        let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.Rewardsticket(message, id, supportRole.id , message.author.id, everyone);   
        let embed2 = new Discord.MessageEmbed()
          .setDescription("Creating...");
        msg.edit(embed2).then(_=> {
          msg.delete(embed2)
        })
        return
      }
      if (rid === 1){
            let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.ticket(message, id, supportRole.id , message.author.id, everyone);
        let embed2 = new Discord.MessageEmbed()
          .setDescription("Creating...");
        msg.edit(embed2).then(_=> {
          msg.delete(embed2)
        })
        return
      
      }
      if (rid !== 2) {
        let embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(pages[rid].title)
          .setDescription(pages[rid].description);

        msg.edit(embed2);
      } else {
        msg.delete();
      }
    }
    reactArrows(0);
    let collector = msg.createReactionCollector(
      (reaction, user) => {
        return (
          user.id !== msg.client.user.id &&
          pageemo.includes(reaction.emoji.name)
        );
      },
      { time: 180000 }
    ); // 180000 = 3 mins
    collector.on("collect", reaction => {
      handleReaction(reaction);
    });
    collector.on("end", () => msg.delete());
  });                                  
    return;
  
  }
   
  if (TempBan !== null && cooldown - (Date.now() - TempBan) > 0) {
    
      let timeObj = ms(cooldown - (Date.now() - TempBan))

  let sEmbed = new Discord.MessageEmbed()
.setColor("RED")
  .setTitle("You've been support-banned!")
   .setDescription(`It seems you've been **support banned**! Your ban will last for **${timeObj.days}d ${timeObj.hours}hrs ${timeObj.minutes}min** ${timeObj.ms}ms remaning to be unbanned.`)
   message.channel.send(sEmbed)
   return;
  }
      if(message.member.roles.cache.some(r => r.name === client.config.roles.donator)) {
          
        let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.PremiumTicket(message, id, supportRole.id , message.author.id, everyone);
    message.react("âœ…") 
    return;
  }
  
        if(message.member.roles.cache.some(r => r.name === client.config.roles.booster)) {
        
        let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.PremiumTicket(message, id, supportRole.id , message.author.id, everyone);
message.react("âœ…")
    return;
  }
 
  // let newmsg = message.channel.send("Hold up!")
  let embed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`
Please react to the following to get your ticket categorised.

🎉) To claim rewards (invite/social rewards)
💳) For account/billing purposes
❌) To lock the prompt

For anything else you must go to <#710770096703930429>. If you create unnecessary tickets you would be ticket banned.

**Loading... This may take up to 4 seconds.**
`);
  //.setDescription("");

  message.channel.send(`<@${message.author.id}>`, embed).then(msg => {
    function reactArrows(arrow) {
      if (arrow === 3) {
        embed.setColor("RANDOM");
        embed.setTitle(pages[0].title);
        embed.setDescription(pages[0].description);
        msg.edit(`<@${message.author.id}>`, embed);
        return;
      }
      msg.react(pageemo[arrow]).then(_ => {reactArrows(arrow + 1);}).catch(e => console.error(`Reaction Error: ${e}`));
    }
    function handleReaction(reaction) {
                    if(message.author.id !== reaction.users.cache.last().id){

        return;
      }
      // console.log(`${reaction.emoji.name} from ${reaction.users.last().username}`);
      console.log(message.author.id)
     
      reaction.remove(reaction.users.cache.last()).catch(e => {
        //if (e.code === 50013) reaction.message.channel.send("I need the 'Manage Messages' permission in order to work properly!");
      });
      const rid = pageemo.indexOf(reaction.emoji.name);
      if (rid === 0) {
        let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.Rewardsticket(message, id, supportRole.id , message.author.id, everyone);   
        let embed2 = new Discord.MessageEmbed()
          .setDescription("Creating...");
        msg.edit(embed2).then(_=> {
          msg.delete(embed2)
        })
        return
      }
      if (rid === 1){
            let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.ticket(message, id, supportRole.id , message.author.id, everyone);
        let embed2 = new Discord.MessageEmbed()
          .setDescription("Creating...");
        msg.edit(embed2).then(_=> {
          msg.delete(embed2)
        })
        return
      
      }
      if (rid !== 2) {
        let embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(pages[rid].title)
          .setDescription(pages[rid].description);

        msg.edit(embed2);
      } else {
        msg.delete();
      }
    }
    reactArrows(0);
    let collector = msg.createReactionCollector(
      (reaction, user) => {
        return (
          user.id !== msg.client.user.id &&
          pageemo.includes(reaction.emoji.name)
        );
      },
      { time: 180000 }
    ); // 180000 = 3 mins
    collector.on("collect", reaction => {
      handleReaction(reaction);
    });
    collector.on("end", () => msg.delete());
  });
      
   /* let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.ticket(message, id, supportRole.id , message.author.id, everyone);
message.react("âœ…") */
};

module.exports.help = {
    name: "open",
    aliases: ["new", "ticket", "create"]
};





































/* jshint esversion: 8 

const index = require("../index");
const functions = require("../modules/functions");
const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms');
const pageemo = ["🎉", "💳", "❌"];
const pages = [
  {
    title: "» FalixNodes Tickets",
    description: `
Please react to the following to get your ticket categorised.

🎉) To claim rewards (invite/social rewards)
💳) For account/billing purposes
❌) To lock the prompt

For anything else you must go to <#710770096703930429>. If you create unnecessary tickets you would be ticket banned.
`
  },


  {
    title: "1st Page",
    description: `
Hi, this is a bug. Report this to a staff
`
  },
    {
    title: "2nd Page",
    description: `
Welcome to the 2nd (this is a  bug too) (remind huss to fix it kthx)
`
  }
];

let page = 0;
module.exports.run = async(client, message, args) => {
  let cooldown = 518400000;
  let TempBan = await db.fetch(`TempBan_${message.guild.id}_${message.author.id}`);
  if(message.member.roles.cache.find(r => r.name == 'Support Team')) return message.channel.send("Sorry, support agents are not allowed to create tickets for security purposes.")
   
  if (TempBan !== null && cooldown - (Date.now() - TempBan) > 0) {
    
      let timeObj = ms(cooldown - (Date.now() - TempBan))

  let sEmbed = new Discord.MessageEmbed()
.setColor("RED")
  .setTitle("You've been support-banned!")
   .setDescription(`It seems you've been **support banned**! Your ban will last for **${timeObj.days}d ${timeObj.hours}hrs ${timeObj.minutes}min** ${timeObj.ms}ms remaning to be unbanned.`)
   message.channel.send(sEmbed)
   return;
  }
      if(message.member.roles.cache.some(r => r.name === client.config.roles.donator)) {
          
        let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.PremiumTicket(message, id, supportRole.id , message.author.id, everyone);
    message.react("✅") 
    return;
  }
  
        if(message.member.roles.cache.some(r => r.name === client.config.roles.booster)) {
        
        let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.PremiumTicket(message, id, supportRole.id , message.author.id, everyone);
message.react("✅")
    return;
  }
 
  // let newmsg = message.channel.send("Hold up!")
  let embed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`
Please react to the following to get your ticket categorised.

🎉) To claim rewards (invite/social rewards)
💳) For account/billing purposes
❌) To lock the prompt

For anything else you must go to <#710770096703930429>. If you create unnecessary tickets you would be ticket banned.

**Loading... This may take up to 4 seconds.**
`);
  //.setDescription("");

  message.channel.send(`<@${message.author.id}>`, embed).then(msg => {
    function reactArrows(arrow) {
      if (arrow === 3) {
        embed.setColor("RANDOM");
        embed.setTitle(pages[0].title);
        embed.setDescription(pages[0].description);
        msg.edit(`<@${message.author.id}>`, embed);
        return;
      }
      msg.react(pageemo[arrow]).then(_ => {reactArrows(arrow + 1);}).catch(e => console.error(`Reaction Error: ${e}`));
    }
    function handleReaction(reaction) {
                    if(message.author.id !== reaction.users.cache.last().id){

        return;
      }
      // console.log(`${reaction.emoji.name} from ${reaction.users.last().username}`);
      console.log(message.author.id)
     
      reaction.remove(reaction.users.cache.last()).catch(e => {
        //if (e.code === 50013) reaction.message.channel.send("I need the 'Manage Messages' permission in order to work properly!");
      });
      const rid = pageemo.indexOf(reaction.emoji.name);
      if (rid === 0) {
        let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.Rewardsticket(message, id, supportRole.id , message.author.id, everyone);   
        let embed2 = new Discord.MessageEmbed()
          .setDescription("Creating...");
        msg.edit(embed2).then(_=> {
          msg.delete(embed2)
        })
        return
      }
      if (rid === 1){
            let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.ticket(message, id, supportRole.id , message.author.id, everyone);
        let embed2 = new Discord.MessageEmbed()
          .setDescription("Creating...");
        msg.edit(embed2).then(_=> {
          msg.delete(embed2)
        })
        return
      
      }
      if (rid !== 2) {
        let embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(pages[rid].title)
          .setDescription(pages[rid].description);

        msg.edit(embed2);
      } else {
        msg.delete();
      }
    }
    reactArrows(0);
    let collector = msg.createReactionCollector(
      (reaction, user) => {
        return (
          user.id !== msg.client.user.id &&
          pageemo.includes(reaction.emoji.name)
        );
      },
      { time: 180000 }
    ); // 180000 = 3 mins
    collector.on("collect", reaction => {
      handleReaction(reaction);
    });
    collector.on("end", () => msg.delete());
  });
      
   /* let id = functions.generate.ticketID(message.author.id);
    let everyone = functions.roles.cache_findByName(message, "@everyone");
    var supportRole;

    if(functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase()) != null) {
        supportRole = functions.roles.cache_findByName(message, client.config.roles.support.toLowerCase());
    } else {
        return message.channel.send("Error! roles.support does not exist within this guild!");
    }
    
    if(functions.channels.cache_findbyName(message, `ticket-${id}`)) {
        let ticket = functions.channels.cache_findbyName(message, `ticket-${id}`);
        return functions.messages(message, "ticketAlreadyOpen", message.author.id, ticket.id);
    }

    functions.generate.ticket(message, id, supportRole.id , message.author.id, everyone);
message.react("✅") */ 
/*
};

module.exports.help = {
    name: "open",
    aliases: ["new", "ticket", "create"]
}; */