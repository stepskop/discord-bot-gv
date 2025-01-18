const { EmbedBuilder, Colors } = require('discord.js')

module.exports = (config, client, interaction) => {
    return interaction.reply({embeds: [new EmbedBuilder().setColor(Colors.DarkPurple).setTitle('Commands').setDescription(
        '\n\n\`\`\`Game deals\`\`\`'+
        '\*\*/free\*\* - Gives you some hot ongoing game sales\n\n'+
        '\`\`\`Minecraft server\`\`\`'+
        '\*\*/mcserver ip\*\* - Gives status and IP to our Minecraft server\n\n'+
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
        '\*\*/sendms\*\* - Send direct message to specific USER or ROLE\n'+
        '\*\*/mcserver start\*\* - Starts our Minecraft server and gives IP')], ephemeral: true})
}
