const { SlashCommandBuilder, chatInputApplicationCommandMention } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('copy')
        .setDescription('Copies a message and reapets it back')
        .addStringOption(option => option.setName('message').setDescription('The message to copy').setRequired(true)),
        async execute(interaction) {
            interaction.reply(interaction.options.getString('message'));
            console.log(interaction.user.tag, "used /copy");
        }
}