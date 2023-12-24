const Jumble = require("jumble-words");
const jumble = new Jumble();
const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
    const word = jumble.generate();
    const filter = m => m.author.id === message.author.id;

    console.log(word);
    await message.channel.send(`Your word is **${word[0].jumble}**!`);
    const incorrectword = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL(), 'https://client.falixnodes.net')
    .setThumbnail('https://cdn.discordapp.com/icons/710503370187735160/a_c84258e58f0d89be530fa6b5181a69b7.gif?size=1024')
    .setColor("#8a57fe")
    .addField(`❌ | ${word[0].word}`, `Wrong word.. You've lost one IQ point!`)
       .setTimestamp()
  .setFooter('2020 FalixNodes Limited');
    
    message.channel.awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000
    })
    .then(collected => {
        const m = collected.first();
        if (m.content.toLowerCase() !== word[0].word.toLowerCase()) return db.subtract(`IQ_${message.author.id}`, 1).then(x => {message.channel.send(incorrectword)});
      //  return message.channel.send(`✅ | Correct guess! The word was **${word[0].word}**.`);
      db.add(`FalixPointsHuss_${message.author.id}`, 1);
      db.add(`IQ_${message.author.id}`, + 1);
      const correctGuess = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL(), 'https://client.falixnodes.net')
    .setThumbnail('https://cdn.discordapp.com/icons/710503370187735160/a_c84258e58f0d89be530fa6b5181a69b7.gif?size=1024')
    .setColor("#8a57fe")
    .addField(`${word[0].word}`, `Correct! You have earned an additional IQ point.`)
       .setTimestamp()
  .setFooter('2020 FalixNodes Limited')
  return message.channel.send(correctGuess)
    })
    .catch(() => {
      db.subtract(`IQ_${message.author.id}`, 1)
      const notIntime = new Discord.MessageEmbed()
       .setAuthor(message.author.username, message.author.displayAvatarURL(), 'https://client.falixnodes.net')
    .setThumbnail('https://cdn.discordapp.com/icons/710503370187735160/a_c84258e58f0d89be530fa6b5181a69b7.gif?size=1024')
    .setColor("#8a57fe")
    .addField(`❌ | ${word[0].word} | ❌`, `You didn't answer in time! Therefore I have subtracted one IQ point away from you!`)
       .setTimestamp()
  .setFooter('2020 FalixNodes Limited')
      message.channel.send(notIntime)
        //message.channel.send(`❌ | You did not answer in time. The correct word was **${word[0].word}**!`);
    })
}

module.exports.help = {
    name: "jumble",
    aliases: ["mix"]
};