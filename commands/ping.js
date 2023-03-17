const { SlashCommandBuilder, chatInputApplicationCommandMention } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction) {
        interaction.reply('pong');
        console.log(interaction.user.tag, "used /ping");
    }
}