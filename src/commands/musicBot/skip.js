const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    try {
        if (!queue || queue.songs.length == 1) {
            return interaction.reply({embeds: [new MessageEmbed().setDescription("There are no tracks to \*\*skip\*\*!")]})
        }
        else {
            queue.skip(voiceChannel)
            queue = client.distube.getQueue(voiceChannel)
            return interaction.reply({content: "\*\*Skipped\*\* to another track! :arrow_down:"})
        }
    } catch (errorSkip) {
        return interaction.reply({content:"Unsupported", ephemeral: true})
    }
}  