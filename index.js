const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('beep beep bot is ready');
})

bot.login(config.BOT_TOKEN);