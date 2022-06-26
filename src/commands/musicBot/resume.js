const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    if (!queue) {
        return interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\* or any track to be \*\*resumed\*\*")], ephemeral: true})
    }
    await queue.resume(voiceChannel)
    return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Track has been \*\*resumed\*\* by <@" + interaction.member.user + ">")]})
}