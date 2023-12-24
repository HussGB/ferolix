const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const ytdl = require('ytdl-core'); 
connection.play(ytdl('https://www.youtube.com/watch?v=ABuNwLP-z9o', 
{ filter: 'audioonly' }
))
    } else {
      message.reply('You need to join a voice channel first!');
    }
}

module.exports.help = {
    name: "play",
    aliases: ["join"]
};