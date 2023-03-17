const { SlashCommandBuilder, chatInputApplicationCommandMention, EmbedBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('creates an embed with given options')
        .addStringOption((option) => option.setName('title').setDescription('The title of the embed').setRequired(true))
        .addStringOption((option) => option.setName('description').setDescription('The description of the embed'))
        .addStringOption((option) => option.setName('footer').setDescription('The footer of the Embed')),
    
    async execute(interaction) {
        let embed = new EmbedBuilder()
        .setTitle(interaction.options.getString('title'))
        .setDescription(interaction.options.getString('description'))
        .setFooter({
            text: interaction.options.getString('footer')
            })
        interaction.reply({ embeds: [embed] });
        console.log(interaction.user.tag, "used /embed");
        console.log("Title:", "'"+interaction.options.getString('title')+"'");
        console.log("Description:", "'"+interaction.options.getString('description')+"'");
        console.log("Footer:", "'"+interaction.options.getString('footer')+"'");
        }    
    }