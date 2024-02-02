const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('help')
    .setDescription('Veja uma lista de funcionalidades do bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setTitle('Lista de funcionalidades')
        .setThumbnail('https://icons8.com/icon/c3zI62GHkeqp/help')
        .setDescription('Vamos conhecer mais sobre funcionalidades desse bot!')
        .addFields(
            { name: '/help', value: 'Aqui você pode ver uma lista de comandos disponíveis para o bot' },
            { name: '/gettarefas', value: 'Aqui você pode ver todas as tarefas pendentes do curso' },
            { name: '/getcalendario', value: 'Aqui você pode ver informações sobre o calendário do curso' },
            { name: '/addcalendario', value: 'Aqui você pode adicionar um item no calendário do curso' },
            { name: '/addtarefa', value: 'Aqui você pode adicionar uma atividade do curso' },
            { name: '/delcalendario', value: 'Aqui você pode deletar uma data do curso' },
            { name: '/deltarefa', value: 'Aqui você pode deletar uma tarefa do curso' }
        )
        .setTimestamp()
        await interaction.reply({ embeds: [embed] });
    }
}