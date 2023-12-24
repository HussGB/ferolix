/* jshint esversion: 8 */

// Imports
const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const handler = require("./modules/handler");
const onMessage = require("./events/message");
const onReady = require("./events/ready");
const db = require("quick.db")
// Sets
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;

// Startup
handler.commands.loadAll(client);

client.on("ready", onReady);
client.on("ready", async (message) => {
 
//    setInterval(function() {
  //    console.log(message.author.id)
 // db.set(`FalixPointsHuss_${message.author.id}`, 1);

//}, 3000);
})


// Message Events
client.on("message", async (message) => {
    onMessage.commands.finder(client, message);
});
client.on("message", async (message) => { 
if (message.content.startsWith('dontlmaogfndfhgbjhfjdsmhfgdlkhfdksajdklljhb')) {

if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You don\'t have permissions to use this command')

  message.guild.fetchBans().then(bans => {
    bans.forEach(banInfo => {
      message.guild.members.unban(banInfo.user);
    });
    message.channel.send(`Unbanned **${bans.size}** users`)
  })
}
  }) 



client.login(config.token);



// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("transcripts"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/robots.txt", (request, response) => {
  response.sendFile(__dirname + "/robots.txt");
});

// send the default array of dreams to the webpage



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
