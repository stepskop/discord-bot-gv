const { EmbedBuilder, Colors } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, options) => {
    try {
        const volumeNum = options.getNumber('percent')
        if (volumeNum > 100 || volumeNum < 1) {
         return interaction.reply({embeds: [new EmbedBuilder().setDescription("Use number between \*\*1\*\* and \*\*100\*\*")], ephemeral: true})
        }
        client.distube.setVolume(voiceChannel, volumeNum)
        return interaction.reply({embeds: [new EmbedBuilder().setColor(Colors.Purple).setDescription(`Volume has been set to \`${volumeNum}%\``)]})
    } catch (e) {
        if (e.errorCode === "RESUMED") {
            interaction.reply({embeds: [new EmbedBuilder().setDescription("There is no \*\*paused\*\* track")], ephemeral:true})
        } else if (e.errorCode === "PAUSED"){
            interaction.reply({embeds: [new EmbedBuilder().setDescription("There is no track to \*\*pause\*\*")], ephemeral:true})
        } else {
        const errorEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription("Something went wrong. Error: "+ e)
        interaction.reply({embeds: [errorEmbed], ephemeral:true})
        } 
    }
}
