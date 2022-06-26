const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, voiceChannel) => {
    try {
        if (options.getString('search').includes('https://deezer')) {
            return await interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Unsupported link")]})
        }
        //console.log(songG);
        client.distube.play( voiceChannel, options.getString('search'), { textChannel: channel, member: member })
        return await interaction.reply({content: "\*\*Added\*\*! :arrow_down:"})
        
    } catch (errorPlay) {
        return await interaction.reply({embed: [new MessageEmbed().setColor("RED").setDescription("Error: " + errorPlay)]})
    }
}