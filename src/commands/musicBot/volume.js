const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction) => {
    const volumeNum = options.getNumber('percent')
    if (volumeNum > 100 || volumeNum < 1) {
        return interaction.reply({embeds: [new MessageEmbed().setDescription("Use number between \*\*1\*\* and \*\*100\*\*")], ephemeral: true})
    }
    client.distube.setVolume(voiceChannel, volumeNum)
    return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription(`Volume has been set to \`${volumeNum}%\``)]})
}