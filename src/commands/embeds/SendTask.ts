import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { time } from 'console'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtarefa')
        .setDescription('Adiciona uma nova tarafa a lista!')
        .addStringOption(option => option.setName('tarefa').setDescription('O titulo da tarefa!').setRequired(true))
        .addStringOption(option => option.setName('descricao').setDescription('A descricao da tarefa!').setRequired(true))
        .addStringOption(option => option.setName('data').setDescription('A data da tarefa!').setRequired(true)),
    async execute(interaction: any) {
        const prisma = new PrismaClient()
        const tarefa = interaction.options.getString('tarefa')
        const descricao = interaction.options.getString('descricao')
        const data = interaction.options.getString('data')
        const embed = new EmbedBuilder()
        .setTitle('Tarefa adicionada!')
        .setDescription(`Título da tarefa: ${tarefa}\nDescrição sobre a tarefa: ${descricao}\n data/prazo: ${data}`)
        .setImage('https://i.ibb.co/Q6c6v23/Atividade.png')
        .setColor('#00ff00')
        .setTimestamp()
        await interaction.reply({ embeds: [embed] });
        await prisma.atividades.create({
            data: {
                nome : tarefa,
                descricao: descricao,
                data: new Date(),
                prazo: data,
            }
        })
    }
}