const { MessageEmbed } = require('discord.js')
module.exports = (config, client) => {
    
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return
        }

        const { commandName, options, member, channel } = interaction

        const guild = client.guilds.resolve(config.guild)
        const usedChannel = interaction.channel.id
        const voiceChannel = member.voice.channel;
        
        console.log("Executed /"+commandName+ " by "+ interaction.member.user.tag + " ("+ interaction.member.user.username + ")")

        if (commandName === 'play'||
        commandName === 'stop'|| 
        commandName === 'skip'|| 
        commandName === 'volume'|| 
        commandName === 'queue'|| 
        commandName === 'pause'|| 
        commandName === 'resume') {
            const allowedChannel = [config.musicChannel, config.testChannel]
            
            if (usedChannel === allowedChannel[0] || usedChannel === allowedChannel[1]) {
                if (!voiceChannel) {
                    let embed = new MessageEmbed()
                    .setDescription("You must be in voice channel!")
                    console.log('User is NOT in voice')
                    return await interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                } else if (voiceChannel) {
                    var queue = client.distube.getQueue(voiceChannel)
                }
                if (guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId) {
                    let embed = new MessageEmbed()
                    .setDescription(`Already playing in <#"+ ${guild.me.voice.channelId}`)
                    return await interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                } else {
                    console.log("User IS in voice - SUCCES")
                }
                if (commandName === 'volume' || 
                commandName === 'pause' ||
                commandName === 'stop'
                ) {
                    if (!queue) {
                        return await interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\* or \*\*track\*\* playing")], ephemeral: true})
                    }
                }
            } else {
                return await interaction.reply({
                    embeds: [new MessageEmbed().setDescription("Use proper text channel ( <#823638576616833084> )")],
                    ephemeral: true
                })
            }
        }

        if (commandName === 'roleall' || 
        commandName === 'sendms' ||
        commandName === 'help' ||
        commandName === 'free'
        ) {
            if (usedChannel != config.commandsChannel) {
                return await interaction.reply({
                embeds: [new MessageEmbed().setDescription("Use proper text channel ( <#982053578342559794> )")],
                ephemeral: true
                })
            }
        }

        try {
            switch (commandName) {
                case 'free':
                    
                    const freeCommand = require('./commands/gameDeals/free')
                    freeCommand(config, client, interaction)
                    break;

                case 'help':

                    const helpCommand = require('./commands/help')
                    helpCommand(config, client, interaction)
                    break

                case 'sendms':

                    const sendmsCommand = require('./commands/admin/sendms')
                    sendmsCommand(config, client, interaction, guild, options)
                    break;

                case 'roleall':

                    const roleallCommand = require('./commands/admin/roleall')
                    roleallCommand(config, client, interaction, guild, options)
                    break

                case 'play':
                    
                    const playCommand = require('./commands/musicBot/play')
                    playCommand(config, client, interaction, voiceChannel, options)
    
                case 'stop':

                    const stopCommand = require('./commands/musicBot/stop')
                    stopCommand(config, client, interaction, voiceChannel, queue)
    
                case 'skip':

                    const skipCommand = require('./commands/musicBot/skip')
                    skipCommand(config, client, interaction, voiceChannel, queue)

                case 'queue':
                    //var queue = await client.distube.getQueue(voiceChannel)
                   const queueCommand = require('./commands/musicBot/queue')
                   queueCommand(config, client, interaction, voiceChannel, queue)

                case 'pause':

                    const pauseCommand = require('./commands/musicBot/pause')
                    pauseCommand(config, client, interaction, voiceChannel, queue)

                case 'resume':

                    const resumeCommand = require('./commands/musicBot/resume')
                    resumeCommand(config, client, interaction, voiceChannel, queue)

                case 'volume':
                    const volumeCommand = require('./commands/musicBot/volume')
                    volumeCommand(config, client, interaction, options)
            }
        } catch (e) {
            //console.log(e)
            if (e.errorCode === "RESUMED") {
                await interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*paused\*\* track")], ephemeral:true})
            } else if (e.errorCode === "PAUSED"){
                await interaction.reply({embeds: [new MessageEmbed().setDescription("There is no track to \*\*pause\*\*")], ephemeral:true})
            } else {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Something went wrong. Error: "+ e)
            await interaction.reply({embeds: [errorEmbed], ephemeral:true})
            }
        }
    })
}