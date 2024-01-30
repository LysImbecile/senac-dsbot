const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('gettarefas')
        .setDescription('Mostra todas as tarefas!'),
    async execute(interaction) {
        const prisma = new PrismaClient()
        const atividades = await prisma.atividades.findMany()
        const embed = new EmbedBuilder()
        .setTitle('Tarefas em progresso')
        .setDescription('Aqui estão todas as tarefas!')
        .setTimestamp()

        atividades.forEach((atividade) => {
            embed.addFields({ name: `Título da tarefa: ${atividade.nome}`, value: `Descrição sobre a tarefa: ${atividade.descricao}\n data/prazo: ${atividade.prazo}\n *Id da tarefa: ${atividade.id}*` })
        });
        await interaction.reply({ embeds: [embed] });
    }
};