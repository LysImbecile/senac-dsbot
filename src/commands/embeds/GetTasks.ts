import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { PrismaClient } from '@prisma/client'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gettasks')
        .setDescription('Mostra todas as tarefas!'),
    async execute(interaction: any) {
        const prisma = new PrismaClient()
        const atividades = await prisma.atividades.findMany()
        const embed = new EmbedBuilder()
        .setTitle('Tarefas em progresso')
        .setDescription('Aqui estão todas as tarefas!')
        .setColor('#00ff00')
        .setTimestamp()
        atividades.forEach((atividade : any) => {
            embed.addFields({ name: `Título da tarefa: ${atividade.nome}`, value: `Descrição sobre a tarefa: ${atividade.descricao}\n data/prazo: ${atividade.prazo}\n *Id da tarefa: ${atividade.id}*` })
        })
        await interaction.reply({ embeds: [embed] });
    }
}