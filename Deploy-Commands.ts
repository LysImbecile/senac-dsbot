const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./src/config.json');

function getCommandFiles(dir: string): string[] {
    let commandFiles: string[] = [];
    const files: string[] = fs.readdirSync(dir);

    for (const file of files) {
        const abs: string = path.join(dir, file);

        if (fs.statSync(abs).isDirectory()) {
            commandFiles = commandFiles.concat(getCommandFiles(abs));
        } else if (file.endsWith('.ts')) {
            commandFiles.push(abs);
        }
    }

    return commandFiles;
}

const commandsPath = path.join(__dirname + "/src/", 'commands');
const commandFiles = getCommandFiles(commandsPath);

const commands = [];
for (const file of commandFiles) {
    const command = require(file);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
        console.table(commandFiles)
    } catch (error) {
        console.error(error);
    }
})();