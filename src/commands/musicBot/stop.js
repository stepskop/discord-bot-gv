const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    await queue.stop(voiceChannel)
    queue = await client.distube.getQueue(voiceChannel)
    return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("\*\*Stopped\*\* by <@" + interaction.member.user + ">")]})
}