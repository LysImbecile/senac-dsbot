const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('teste')
    .setDescription('Te responde com pong!');

async function execute(interaction) {
    await interaction.reply('Pong!');
}

module.exports = { data, execute };