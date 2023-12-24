const Discord = require('discord.js');
const index = require("../index");
const functions = require("../modules/functions");
const db = require('quick.db')
const ms = require('parse-ms');

module.exports.run = async(client, message, args) => {
const help = new Discord.MessageEmbed()
.setAuthor("Ferolix Commands", 'https://cdn.discordapp.com/icons/710503370187735160/a_c84258e58f0d89be530fa6b5181a69b7.gif?size=1024', 'https://falixnodes.net')
  .setThumbnail('https://cdn.discordapp.com/icons/710503370187735160/a_c84258e58f0d89be530fa6b5181a69b7.gif?size=1024')
  .setColor("#8a57fe")
  .addField("『Help』",
`
**🎫 Support Commands**
\`-new [Reason]\` - Creates a ticket.
\`-close [Reason]\` - Closes a ticket.
\`-add\` [@MentionUser] - Adds a user to a ticket.
\`-remove\` [@MentionUser] - Removes a user from a ticket.
\`-spban [@MentionUser] [Reason]\` - Support ban.
\`-unsban [@MentionUser]\` - Remove an active support ban.\n
**<:PepeHappy:719901540076355685> Fun Commands**
\`-work\` - Earn a FalixPoint.
\`-leaderboard\` - View top 20 FalixPoint holders.
\`-points\` - View your/others Ferolix records
\`-jumble\` - Attempt to earn IQ points.\n
**🖱️ Utility**
\`-stats\` - Bot statistics.

**Ferolix V.8.7.3**
`)
message.channel.send(help)
};

module.exports.help = {
    name: "help",
    aliases: ["welp", "commands", "cmds"]
};