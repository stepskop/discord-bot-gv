const axios = require('axios')
const { EmbedBuilder, Colors } = require('discord.js')
const birthplace = require('../../birthplace')
module.exports = (config, client, interaction, guild, options) => {
    const testChannel = client.channels.cache.get(config.testChannel)
    if (interaction.member.id === config.admin) {
        switch (options.getSubcommand()) {
            case 'on':
                birthplace(config, client, 'on')
                interaction.reply({embeds: [new EmbedBuilder().setColor(Colors.Green).setTitle('Heatingup my birthplace...')], ephemeral: true})
                break;
        
            case 'off':
                birthplace(config, client, 'off')
                interaction.reply({embeds: [new EmbedBuilder().setColor(Colors.Orange).setTitle('Shuting down my birthplace...')], ephemeral: true})
                break;
        }
    } else {
        interaction.reply({embeds: [new EmbedBuilder().setDescription("You are not permitted to operate with birthplace pc")], ephemeral: true})
    }

}
