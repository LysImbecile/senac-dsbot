const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calendário')
        .setDescription('Te responde com o mais recente calendário do curso!'),
    async execute(interaction) {
        const prisma = new PrismaClient()
        const calendario = await prisma.calendario.findMany()
        const embed = new EmbedBuilder()
            .setTitle('Calendário 📅')
            .setDescription('Aqui estão todos os compromissos no momento!')
            .setTimestamp();

            calendario.forEach((calendario) => {
                embed.addFields({name : `Tipo de evento : ${calendario.nome}`, value : `Descrição sobre o evento : ${calendario.descricao}\n **data/prazo: ${calendario.data}**\n *Id do evento: ${calendario.id}*`})
            });
        await interaction.reply({ embeds: [embed] });
    }
};