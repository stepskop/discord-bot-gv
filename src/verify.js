const { MessageEmbed } = require('discord.js')
const firstMessage = require('../src/first-message')

module.exports = (client) => {
    const channelId = '976475795990138890'
    
    const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === 'confirm')

    const emojis = {
        confirm: '',
        x: ''
    }
    const reactions = []

    let emojiText = '`Rules:`' + '\n\n'+ '*1.* Don\'t be toxic' + '\n' + '*2.* Enjoy!' + '\n\n' + '**React with ' + '<:'+ getEmoji('confirm').name + ':' + getEmoji('confirm').id + '>' + ' to get in!**' 
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)
    }
    let emojiEmbed = new MessageEmbed()
    .setTitle("Verification")
    .setDescription(emojiText)
    .setColor('#00d26a')

    firstMessage(client, channelId, emojiEmbed, reactions)
    const handleReaction = (reaction, user, add) => {
        if (user.id === '970985691427254273') {
            return
        }
        //const emoji = reaction._emoji.name
        const { guild } = reaction.message
        const roleName = 'Gamer'
        if (!roleName) {
            return
        }
        const role = guild.roles.cache.find((role) => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)
        if (add) {
            member.roles.add(role)
            member.roles.remove(guild.roles.cache.find((role) => role.name === 'Need to be verified'))
        } 
        // else{
        //     member.roles.remove(role)
        // }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true)
        }
    })
}