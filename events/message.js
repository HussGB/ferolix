/* jshint esversion: 8 */

const config = require("../config.json");
const functions = require("../modules/functions");
const Discord = require("discord.js");
const db = require("quick.db")
const client = require("../index.js")
module.exports.commands = {
    finder: async (client, message) => {
      const staff = ["532349905679679498", "548901891765960724"]
      if(!message.author.id === staff){
        return;
      }
        let prefix = ".";
        if (message.content.indexOf(prefix) !== 0) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        let Command = `${prefix}${command}`;
        if (!commandfile) {
            return message.react("❌")
        }
        if (commandfile) commandfile.run(client, message, args);
    }
};

module.exports.categories = async (client, message) => {

    if(message.channel.type === "dm") return;

    if(config.categories.enabled === false) return;


};