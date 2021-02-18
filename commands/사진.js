const discord = require("discord.js");
const img = require('images-scraper')
const cheerio = require("cheerio");
const request = require("request");

const google = new img({
    puppeteer : {
        headless : true,    
    }
})

module.exports = {
    name: 'image',
    description: "Sends a image image",
    async run(bot, message, args) {
        const query = args.join(" ")
        if (!query) return message.channel.send('Please enter a search query')
 
        var random = Math.floor((Math.random() * 90) + 0);
        console.log(random)
        const results = await google.scrape(query, 100)
        const hasil = results[random].url
        message.channel.send(`Generate Picture...`)
        let embedpic = new discord.MessageEmbed()
            .setTitle(`Picture successfuly generate  `)
            .setImage(hasil)
        message.channel.send(embedpic)
 
    }
}

module.exports.help = {
    name: "사진"
}
