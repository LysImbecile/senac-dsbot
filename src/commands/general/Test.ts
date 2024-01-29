const { SlashCommandBuilder, CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('teste')
        .setDescription('Te responde com pong!'),
    async execute(interaction : any) {
        await interaction.reply('Pong!');
    },
};