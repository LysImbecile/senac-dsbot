const { PrismaClient } = require ('@prisma/client')
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('addcalendario')
    .setDescription('Adiciona um evento ao calendário!')
    .addStringOption(option => option.setName('nome').setDescription('Nome do evento!').setRequired(true))
    .addStringOption(option => option.setName('descricao').setDescription('Descrição do evento!').setRequired(true))
    .addStringOption(option => option.setName('data').setDescription('Data do evento!').setRequired(true)),
    async execute(interaction) {
        const prisma = new PrismaClient()
        const nome = interaction.options.getString('nome')
        const descricao = interaction.options.getString('descricao')
        const data = interaction.options.getString('data')
        const embed = new EmbedBuilder()
        .setTitle("Item no calendário adicionado!")
        .setDescription("Seu novo item do calendário foi adicionado no banco de dados.")
        .setTimestamp()
        
        await prisma.calendario.create({ data : {
            nome : nome,
            descricao : descricao,
            data : data
        }})
        await interaction.reply({embeds : [ embed ] })
    }
}