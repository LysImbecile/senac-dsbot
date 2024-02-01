const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtarefa')
        .setDescription('Adiciona uma nova tarafa a lista!')
        .addStringOption(option => option.setName('tarefa').setDescription('O titulo da tarefa!').setRequired(true))
        .addStringOption(option => option.setName('descricao').setDescription('A descricao da tarefa!').setRequired(true))
        .addStringOption(option => option.setName('data').setDescription('A data da tarefa!').setRequired(true))
        .addStringOption(option => option.setName('link').setDescription('O link da tarefa!').setRequired(false)),
         
    async execute(interaction) {
        const prisma = new PrismaClient();
        const tarefa = interaction.options.getString('tarefa');
        const descricao = interaction.options.getString('descricao');
        const data = interaction.options.getString('data');
        const link = interaction.options.getString('link');
        const guildId = Number(interaction.guild.id);
        const embed = new EmbedBuilder()
        .setTitle('Atividade adicionada! 👾')
        .setDescription(`** Título da tarefa : ** ${tarefa}\n ** Descrição sobre a tarefa : ** ${descricao}\n ** data/prazo ** : ${data}`)
        .setImage('https://i.ibb.co/Q6c6v23/Atividade.png')
        .setTimestamp()
        if (!interaction.replied) {
            await interaction.reply({ embeds: [embed] });
        }
        const atividadeData = {
            guildid : guildId,
            nome: tarefa,
            descricao: descricao,
            data: new Date(),
            prazo: data,
            link: link || 'Não definido'  
        }
    
        await prisma.atividades.create({
            data: atividadeData 
        })
    }
}