const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
 
  let data = Quick
    .all()
    .filter(i => i.ID.startsWith("FalixPointsHuss_"))
    .sort((a, b) => b.data - a.data);
  if (data.length < 1) return message.channel.send("No leaderboard");
  let myrank =
    data.map(m => m.ID).indexOf(`FalixPointsHuss_${message.author.id}`) + 1 || "N/A";
  data.length = 20;
  let lb = [];
  for (let i in data) {
    let id = data[i].ID.split("_")[1];
    let user = await client.users.fetch(id);
    user = user ? user.tag : "Anonymous";
    let rank = data.indexOf(data[i]) + 1;
    let level = Quick.get(`IQ_${id}`);
    let xp = data[i].data;
    let xpreq = Math.floor(Math.pow(level / 0.1, 2));
    lb.push({
      user: { id, tag: user },
      rank,
      level,
      xp
    });
  }
    
    let finalOutput = '';
    for ( var i in data ){
      let username = client.users.cache.get(`${(data[i].ID.split('_')[1])}`).username
      let usertag = client.users.cache.get(`${(data[i].ID.split('_')[1])}`).discriminator  
      let userid = client.users.cache.get(`${(data[i].ID.split('_')[1])}`).id
      // <@${(data[i].tag.split('_')[1])}>
    finalOutput += `     ${data[i].data}             ${username}#${usertag}\n`  
    }
    
    let leaderEmbed = new Discord.MessageEmbed()
    .setColor("#8a57fe")
    .setTitle(`**🥇 » ${message.guild.name} - FalixPoints Leaderboard**`)
    .setDescription(`\`\`\`md
 FalixPoints     |      User
=================================
${finalOutput}
\`\`\`
`)
    .setThumbnail(message.guild.iconURL)
    message.channel.send(leaderEmbed);
    
    
};

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb", "top"]
};


/*
const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(client, message, args) => { // eslint-disable-line no-unused-vars
  let data = Quick
    .all()
    .filter(i => i.ID.startsWith("FalixPointsHuss_"))
    .sort((a, b) => b.data - a.data);
  if (data.length < 1) return message.channel.send("No leaderboard");
  let myrank =
    data.map(m => m.ID).indexOf(`FalixPointsHuss_${message.author.id}`) + 1 || "N/A";
  data.length = 10;
  let lb = [];
  for (let i in data) {
    let id = data[i].ID.split("_")[1];
    let user = await client.users.fetch(id);
    user = user ? user.tag : "Anonymous";
    let rank = data.indexOf(data[i]) + 1;
 //   let level = Quick.get(`level_${id}`);
    let FalixPointsHuss = data[i].data;
   // let xpreq = Math.floor(Math.pow(level / 0.1, 2));
    lb.push({
      user: { tag: user },
      FalixPointsHuss,
      rank
    });
  }
    
    const embed = new Discord.MessageEmbed()
    .setTitle("Idle Leaderboard")
    .setColor("GOLD");
  lb.forEach(d => {
    embed.addField(
      `${d.rank}. ${d.user.tag}`,
      `${d.FalixPointsHuss}`
    );
  });
  embed.setFooter(`Your current rank: ${myrank}`);
  return message.channel.send(embed);
 
};

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb", "top"]
};
*/