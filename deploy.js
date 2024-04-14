require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const deprecatedFiles = [];

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent.includes('@deprecated')) {
            deprecatedFiles.push(file);
            continue;
        }
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`\x1b[31m[WARNING] ${filePath} is missing data execute property.\x1b[0m`);
        }
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.token);
(async () => {
    try {
        console.log(`\x1b[32mStarted refreshing ${commands.length} application (/) commands.\x1b[0m`);
        const data = await rest.put(
            Routes.applicationCommands(process.env.clientId),
            { body: commands },
        );
        if (deprecatedFiles.length > 0) {
            console.log(`\x1b[33m[Deprecated] Ignoring ${deprecatedFiles.length} files.`);
        }
        console.log(`\x1b[32mSuccessfully reloaded ${data.length} application (/) commands.\x1b[0m`);
    } catch (error) {
        console.error(error);
    }
})();
