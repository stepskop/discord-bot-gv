const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    try {
        if (!queue) {
            return interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\*")]})
        }
        else {
            try {
                // console.log(Object.keys(queue.songs).length)
                // let displayQueue = queue
                // Object.keys(displayQueue.songs).length = 20
                // console.log(Object.keys(displayQueue.songs).length)
                //console.log(displayQueue.songs.song.name)

                if (Object.keys(queue.songs).length < 20) {
                    return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_PURPLE").setDescription(`${queue.songs.map(
                        (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                        )]})
                } else {
                    return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_PURPLE").setDescription('In queue is ' + Object.keys(queue.songs).length + " songs")]})
                }
                
            } catch (error) {
                console.log(error)
            }
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