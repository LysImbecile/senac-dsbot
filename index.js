/* These lines of code are importing necessary modules and variables for the Discord bot. */
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
    console.log(`Bot ${client.user.tag} is online`);
});

client.commands = new Collection();

function getCommandFiles(dir) {
    let commandFiles = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const abs = path.join(dir, file);

        if (fs.statSync(abs).isDirectory()) {
            commandFiles = commandFiles.concat(getCommandFiles(abs));
        } else if (file.endsWith('.js')) {
            commandFiles.push(abs);
        }
    }

    return commandFiles;
}

const commandsPath = path.join(__dirname, './src/commands');
const commandFiles = getCommandFiles(commandsPath);

for (const file of commandFiles) {
    const command = require(file);
    client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

console.log("Loading commands..."); //
console.table(commandFiles);

client.login(token).then(() => {
    console.log('Logged in!');
   
    
})

client.on('ready', () => {
    client.user.setActivity('Use /help para informações!');
    client.user.setStatus('dnd');
})
