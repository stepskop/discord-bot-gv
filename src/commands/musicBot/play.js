const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, options, channel, member) => {
    try {
        if (options.getString('search').includes('https://deezer')) {
            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Unsupported link")]})
        }
        //console.log(songG);
        client.distube.play( voiceChannel, options.getString('search'), { textChannel: channel, member: member })
        return interaction.reply({content: "\*\*Added\*\*! :arrow_down:"})
        
    } catch (e) {
        console.log(e)

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
        //return interaction.reply({embed: [new MessageEmbed().setColor("RED").setDescription("Error: " + errorPlay)]})
    }
}