const { SlashCommandBuilder, chatInputApplicationCommandMention, EmbedBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');

async function lookup(item) {
    let search = item.replace(/ /g, '+');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://pcpartpicker.com/search/?q='+ search);
    await page.emulateTimezone('America/New_York');
  
    
    await page.screenshot({ path: 'example2.png', fullPage: true });
    const url = page.url();
    console.log(url)
    console.log("url is", typeof url)
    if (url.includes("https://pcpartpicker.com/search")) {
        console.log("search page")
        await page.waitForSelector("#search-results > div.wrapper.wrapper__pageContent > section")
        const content = await page.$("#search-results > div.wrapper.wrapper__pageContent > section")
        await content.screenshot({ path: 'example3.png' });
    }
    if (url.includes("https://pcpartpicker.com/product")) {
        console.log("product page")
        await page.waitForSelector("#prices")
        const content = await page.$("#prices")
        await content.screenshot({ path: 'example3.png' });
    }
    
    await browser.close();
}


module.exports = {
   
    data: new SlashCommandBuilder()
    .setName('lookup')
    .setDescription('Searches for a part on PCPartPicker')
    .addStringOption(option => option.setName('part').setDescription('The part you want to search for').setRequired(true)),
    async execute(interaction) {
        const part = interaction.options.getString('part');
        let url = await lookup(part)
        const embed = new EmbedBuilder()
        .setTitle('Search Results')
        .setUrl(url)
        .setDescription('Here are the results for your search')
       // .addField('Part', part)
        //.addField('Link', 'https://pcpartpicker.com/search/?q='+part.replace(/ /g, '+'))
        //.setImage('attachment://example3.png')
        .setTimestamp()
        .setColor(0x00FF00)
        .setImage('example3.png')
        //.setFooter('PCPartPicker Bot', 'https://i.imgur.com/wSTFkRM.png');
        await interaction.reply({embeds: [embed], files: ['example3.png']});
        console.log(interaction.user.tag, "used /lookup");
       
        console.log(lookup(part))
    }

}
