const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    try {
        if (!queue) {
            return await interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("There are no tracks to \*\*skip\*\*!")]})
        }
        else {
            await queue.skip(voiceChannel)
            queue = await client.distube.getQueue(voiceChannel)
            return await interaction.reply({content: "\*\*Skipped\*\* to another track! :arrow_down:"})
        }
    } catch (errorSkip) {
        return await interaction.reply({content:"Unsupported", ephemeral: true})
    }
}