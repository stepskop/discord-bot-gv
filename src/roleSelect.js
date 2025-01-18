const { EmbedBuilder } = require('discord.js')
const firstMessage = require('./firstMessage')

module.exports = (config, client) => {
    const channelId = config.gameSelectChannel

    const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName)

    const emojis = {
        sot: 'Sea of Thieves',
        apex: 'Apex Legends',
        cod: 'Call of Duty',
        csgo: 'CS:GO',
        mc: 'Minecraft',
        lol: 'League of Legends',

    }
    const reactions = []

    let emojiText = 'React to get role\n\n'
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)
        const fixedEmoji = '<:'+ emoji.name + ':' + emoji.id + '>'
        const role = emojis[key]
        emojiText += fixedEmoji + ' = ' + role + '\n'
    }
    let emojiEmbed = new EmbedBuilder()
    .setTitle("Games you play?")
    .setDescription(emojiText)
    .setColor('#11e8e4')

    firstMessage(client, channelId, emojiEmbed, reactions)
    const handleReaction = (reaction, user, add) => {
        if (user.id === config.thisBot) {
            return
        }
        const emoji = reaction._emoji.name
        const { guild } = reaction.message
        const roleName = emojis[emoji]
        if (!roleName) {
            return
        }
        const role = guild.roles.cache.find((role) => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)
        if (add) {
            member.roles.add(role)
        } else{
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, false)
        }
    })
}
