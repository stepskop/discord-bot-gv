const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, queue) => {
    await queue.pause(voiceChannel)
    return await interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Track has been \*\*paused\*\* by <@" + interaction.member.user + ">")]})
}