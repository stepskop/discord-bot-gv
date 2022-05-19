const { MessageEmbed } = require('discord.js')
const firstMessage = require('../src/first-message')

module.exports = (client) => {
    const channelId = '976475795990138890'
    
    firstMessage(client, channelId, emojiEmbed, reactions)
}