const discord = require("discord.js");
const config = require("./config.json")
const fs = require("fs")
const bot = new discord.Client({disableEveryone: true});
const cheerio = require("cheerio")
const request = require("request")
const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

bot.on("ready", async () => {
    console.log(`${bot.user.username} 는 온라인 입니다.`);
    bot.user.setActivity(`너 나의 오니가 되고싶나?`);
});

bot.commands = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    console.log(`Lodding ${jsfiles.length} commands....`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("message", async message =>{
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;


    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
});

bot.login(process.env.TOKEN);