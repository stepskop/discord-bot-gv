const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel, options) => {
    try {
        if (options.getString('search').includes('https://deezer')) {
            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Unsupported link")]})
        }
        //console.log(songG);
        client.distube.play( voiceChannel, options.getString('search'), { textChannel: channel, member: member })
        return interaction.reply({content: "\*\*Added\*\*! :arrow_down:"})
        
    } catch (errorPlay) {
        return interaction.reply({embed: [new MessageEmbed().setColor("RED").setDescription("Error: " + errorPlay)]})
    }
}