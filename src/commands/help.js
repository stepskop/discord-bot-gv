const { MessageEmbed } = require('discord.js')

module.exports = (config, client, interaction) => {
    return await interaction.reply({embeds: [new MessageEmbed().setColor('DARK_PURPLE').setTitle('Commands').setDescription(
        '\n\n\`\`\`Game deals\`\`\`'+
        '\*\*/free\*\* - Gives you some hot ongoing game sales\n\n'+
        '\`\`\`Music bot\`\`\`'+
        '\*\*/play\*\* - Plays music in you voice channel\n'+
        '\*\*/skip\*\* - Skips to next track in queue\n'+
        '\*\*/queue\*\* - Shows whole queue of songs\n'+
        '\*\*/volume\*\* - Select volume from 0 to 100\n'+
        '\*\*/pause\*\* - Pauses the playing music\n'+
        '\*\*/resume\*\* - Resumes the paused music\n'+
        '\*\*/stop\*\* - Stops and disconnects bot\n\n'+
        '\`\`\`Admin commands\`\`\`'+
        '\*\*/roleall\*\* - Gives role to all members (excluding bots)\n'+
        '\*\*/sendms\*\* - Send direct message to specific USER or ROLE')]})
}