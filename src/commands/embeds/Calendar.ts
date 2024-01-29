import { EmbedBuilder, SlashCommandBuilder } from "discord.js"; 
import { CommandInteraction } from "discord.js";
import { PrismaClient } from '@prisma/client'


module.exports = {
    data : new SlashCommandBuilder()
    .setName('calendario')
    .setDescription('Te responde com o calendario!'),
    async execute(interaction : CommandInteraction) {
        const embed = new EmbedBuilder()
        .setTitle('Calendario')
        .setDescription('Aqui esta o calendario!')
        .setColor('#00ff00')
        .setTimestamp()
        await interaction.reply({embeds: [embed]});
    }
}