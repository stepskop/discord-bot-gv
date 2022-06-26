const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    try {
        if (!queue) {
            return interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\* or any track to be \*\*resumed\*\*")], ephemeral: true})
        }
        queue.resume(voiceChannel)
        return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Track has been \*\*resumed\*\* by <@" + interaction.member.user + ">")]})
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