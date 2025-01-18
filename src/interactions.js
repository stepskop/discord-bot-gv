const { EmbedBuilder, Colors } = require('discord.js')
const pc = require('./commands/admin/pc')
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
                    let embed = new EmbedBuilder()
                    .setDescription("You must be in voice channel!")
                    console.log('User is NOT in voice')
                    return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                } else if (voiceChannel) {
                    var queue = client.distube.getQueue(voiceChannel)
                }
		const botMember = guild.members.cache.get(client.user.id)
                if (botMember.voice.channel && botMember.voice.channel.id !== member.voice.channel.id) {
                    let embed = new EmbedBuilder()
                    .setDescription(`Already playing in <#+ ${guild.me.voice.channelId}>`)
                    return interaction.reply({
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
                        return interaction.reply({embeds: [new EmbedBuilder().setDescription("There is no \*\*queue\*\* or \*\*track\*\* playing")], ephemeral: true})
                    }
                }
            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder().setDescription("Use proper text channel ( <#823638576616833084> )")],
                    ephemeral: true
                })
            }
        }

        if (commandName === 'roleall' || 
        commandName === 'sendms' ||
        commandName === 'help' ||
        commandName === 'free' ||
        commandName === 'mcserver'||
        commandName === 'pc'
        ) {
            if (usedChannel != config.commandsChannel) {
                return interaction.reply({
                embeds: [new EmbedBuilder().setDescription("Use proper text channel ( <#982053578342559794> )")],
                ephemeral: true
                })
            }
        }

        try {
            switch (commandName) {
                case 'pc':
                    const pcCommand = require('./commands/admin/pc')
                    pcCommand(config, client, interaction, guild, options)
                    break;

                case 'mcserver':

                    const mcserverCommand = require('./commands/admin/mcserver')
                    mcserverCommand(config, client, interaction, guild, options)
                    break; 

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
                    playCommand(config, client, interaction, voiceChannel, options, channel, member)
                    break

                case 'stop':

                    const stopCommand = require('./commands/musicBot/stop')
                    stopCommand(config, client, interaction, voiceChannel, queue)
                    break
    
                case 'skip':

                    const skipCommand = require('./commands/musicBot/skip')
                    skipCommand(config, client, interaction, voiceChannel, queue)
                    break

                case 'queue':
                    //var queue = await client.distube.getQueue(voiceChannel)
                   const queueCommand = require('./commands/musicBot/queue')
                   queueCommand(config, client, interaction, voiceChannel, queue)
                   break

                case 'pause':

                    const pauseCommand = require('./commands/musicBot/pause')
                    pauseCommand(config, client, interaction, voiceChannel, queue)
                    break

                case 'resume':

                    const resumeCommand = require('./commands/musicBot/resume')
                    resumeCommand(config, client, interaction, voiceChannel, queue)
                    break

                case 'volume':
                    const volumeCommand = require('./commands/musicBot/volume')
                    volumeCommand(config, client, interaction, voiceChannel, options)
                    break
                case 'publishdlc':
                    const publishDLC = require('./commands/gameDeals/publishFree')
                    publishDLC(config,client,interaction,options)
                    break
            }
        } catch (e) {
            //console.log(e)
            if (e.errorCode === "RESUMED") {
                interaction.reply({embeds: [new EmbedBuilder().setDescription("There is no \*\*paused\*\* track")], ephemeral:true})
            } else if (e.errorCode === "PAUSED"){
                interaction.reply({embeds: [new EmbedBuilder().setDescription("There is no track to \*\*pause\*\*")], ephemeral:true})
            } else {
            const errorEmbed = new EmbedBuilder()
            .setColor(Colors.Red)
            .setDescription("Something went wrong. Error: "+ e)
            interaction.reply({embeds: [errorEmbed], ephemeral:true})
            }
        }
    })
}
