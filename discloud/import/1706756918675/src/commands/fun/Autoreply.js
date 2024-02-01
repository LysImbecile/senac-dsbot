const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('falar')
    .setDescription('Mande o bot falar algo!')
    .addStringOption(option => option.setName('texto').setDescription('O texto que o bot falará').setRequired(true)),
    
    async execute(interaction) {
        await interaction.reply(`${interaction.options.getString('texto')}`)
    }
}