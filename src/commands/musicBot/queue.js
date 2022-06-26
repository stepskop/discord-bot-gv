const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    if (!queue) {
        return interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\*")], ephemeral:true})
    }
    else {
        
        return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_PURPLE").setDescription(`${queue.songs.map(
            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
            )]})
    }
}