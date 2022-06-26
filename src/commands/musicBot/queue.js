const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    try {
        if (!queue) {
            return interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\*")]})
        }
        else {
            
            return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_PURPLE").setDescription(`${queue.songs.map(
                (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                )]})
        }
    } catch (e) {
        if (e.errorCode === "RESUMED") {
            interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*paused\*\* track")], ephemeral:true})
        } else if (e.errorCode === "PAUSED"){
            interaction.reply({embeds: [new MessageEmbed().setDescription("There is no track to \*\*pause\*\*")], ephemeral:true})
        } else {
        const errorEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("Something went wrong. Error: "+ e)
        interaction.reply({embeds: [errorEmbed], ephemeral:true})
        }
    }
    
}