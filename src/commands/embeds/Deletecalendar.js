const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('delcalendario')
    .setDescription('Deleta um item do calendário pelo ID')
    .addNumberOption( option => option.setName('id').setDescription('Id do evento!').setRequired(true)),

    async execute(interaction) {
        const prisma = new PrismaClient()
        const id = interaction.options.getNumber('id')
        const embed = new EmbedBuilder()
        .setTitle('Evento deletado! 😊')
        .setDescription('O item que você selecionou foi deletado com sucesso do banco de dados!')
        .setTimestamp()

        await prisma.calendario.delete({data : {
            id : id
        }});

        await interaction.send({embeds : [embed]})
    }
}