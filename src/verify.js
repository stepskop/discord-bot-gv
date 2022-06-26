const { MessageEmbed } = require('discord.js')
const firstMessage = require('./firstMessage')

module.exports = (config, client) => {
    const channelId = config.verifyChannel
    
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
        if (user.id === config.thisBot) {
            return
        }
        //const emoji = reaction._emoji.name
        const { guild } = reaction.message
        const roleId = config.verifiedRole
        if (!roleId) {
            return
        }
        const role = guild.roles.cache.find((role) => role.id === roleId)
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
            user.send({embeds: [new MessageEmbed().setTitle('Vítej na GameVibe').setColor('DARK_PURPLE').setDescription('Doufám že se ti tu bude líbit' + '\n\n' + 'Aby ostaní věděli co hraješ, vyber si role v **#🎮game-select🎮**' + '\n\n' + '*GameVibe*')]})
        }
    })
}