/* jshint esversion: 8 */

const config = require("../config.json");
const client = require("../index.js")
module.exports = async () => {
    console.log(`\nTicketBot v${config.version} -> ${client} Launched Successfully`);
};