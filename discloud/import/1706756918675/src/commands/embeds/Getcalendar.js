const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PrismaClient } = require('@prisma/client');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('getcalendario')
        .setDescription('Te responde com o mais recente calendário do curso!'),
        async execute(interaction) {
            const prisma = new PrismaClient();
            const guildid = Number(interaction.guild.id)
            const calendario = await prisma.calendario.findMany({
                where : {
                    guildid : guildid
                }
            })
            const embed = new EmbedBuilder()
            .setTitle('Calendário 📅')
            .setDescription('Aqui estão todos os compromissos no momento!')
            .setTimestamp();

            calendario.forEach((cal) => {
                embed.addFields({name: `** Título do evento : ** ${cal.nome}`, value: `** Descrição sobre a data : ** ${cal.descricao}\n data: ${cal.data}\n *Id do evento : ${cal.id}*`});
            })

            await interaction.reply({embeds: [embed]})
    }     
}