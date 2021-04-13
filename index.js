const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client();

const prefix = "!";

//prints in console if bot is online
bot.on('ready', () => { //.on listens for 'ready' then runs
    console.log('beep beep bot is ready');
})


bot.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const fullCommand = message.content.slice(prefix.length); //slices off prefix from our message
    const args = fullCommand.trim().split(' '); //trims whitespace, splits into array of words from message
    const command = args.shift().toLowerCase(); //splits off the first word from the array to use as command

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! I'm replying to you. This message had a latency of ${timeTaken}ms.`);
        message.channel.send(`Pong! I'm sending to channel. This message had a latency of ${timeTaken}ms.`);
    }

    if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter,x) => counter += x, 0); //arr.reduce(accumulator/reducer function, starting value)
        /*
        let sum = 0;
        for (let i = 0; i < numArgs.length; i++){
            sum += numArgs[i];
        }
        */
        message.channel.send(`The sum is ${sum}.`);
    }

    console.log('command: ', command)
    console.log(args)
})


bot.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.channelID === null) console.log('user left channel', oldState.channelID);
    else if (oldState.channelID === null) console.log('user joined channel', newState.channelID);
    else console.log('user moved channels', oldState.channelID, newState.channelID);
})


bot.login(config.BOT_TOKEN);