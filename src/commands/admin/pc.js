const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const birthplace = require('../../birthplace')
module.exports = (config, client, interaction, guild, options) => {
    const testChannel = client.channels.cache.get(config.testChannel)
    if (interaction.member.id === config.admin) {
        switch (options.getSubcommand()) {
            case 'on':
                birthplace(config, client, 'on')
                interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle('Heatingup my birthplace...')], ephemeral: true})
                break;
        
            case 'off':
                birthplace(config, client, 'off')
                interaction.reply({embeds: [new MessageEmbed().setColor('ORANGE').setTitle('Shuting down my birthplace...')], ephemeral: true})
                break;
        }
    } else {
        interaction.reply({embeds: [new MessageEmbed().setDescription("You are not permitted to operate with birthplace pc")], ephemeral: true})
    }

}