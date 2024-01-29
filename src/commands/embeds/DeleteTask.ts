import {EmbedBuilder, SlashCommandBuilder} from 'discord.js'
import {PrismaClient} from '@prisma/client'


module.exports = {
    data : new SlashCommandBuilder()
    .setName('deltarefa')
    .setDescription('Deleta uma tarefa pelo ID!')
    .addStringOption(option => option.setName('tarefa').setDescription('O ID da tarefa!').setRequired(true)),
    async execute(interaction : any) {
        const embed = new EmbedBuilder()
        .setTitle('Tarefa deletada!')
        .setDescription(`Tarefa deletada com sucesso!`)
        .setColor('#00ff00')
        .setTimestamp()

        const prisma = new PrismaClient()
        const tarefa = interaction.options.getString('tarefa')
        const int_tarefa = Number(tarefa)
        await prisma.atividades.delete({
            where: {
                id: int_tarefa
            }
        })
        await interaction.reply({embeds: [embed]});
    }
}