require("dotenv").config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Message, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent] });
//permissions

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.login(process.env.TOKEN);


const commands = [];
client.commands = new Collection(); 

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set (command.data.name, command);
}
//file management

client.once('ready', () => {
    console.log('Bot Online');
    const clientId = client.user.id;
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    (async () => {
        try {
            console.log(`refreshing ${commands.length} commands...`);
            const data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
    
            console.log(`loaded ${data.length} commands.`);
        } catch (err) {
            if (err) {console.error(err);
        }}
    })();
});
//Command registration
client.on('interactionCreate', async interaction => { 
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
      if (!command) return;
        try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ 
        content: 'There was an error while executing this command!', ephemeral: true });
    }
});
//command execution