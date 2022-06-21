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
                    
                    const freeCommand = require('./commands/free')
                    freeCommand(config, client, interaction)
                    
                    break;
                case 'help':
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
                case 'sendms':
                    if (interaction.member.id === config.admin) {
                        switch (options.getSubcommand()) {
                            case 'user':
                                const userArg = options.getUser('user')
                                const messageUserArg = options.get('message')
                                userArg.send(messageUserArg.value)

                                return await interaction.reply({
                                    content:'Succesfully sent to ' + "<@"+ userArg + ">",
                                    ephemeral:true
                                })
                            case 'role':
                                const roleArg = options.get('role')
                                const messageRoleArg = options.get('message')
                                guild.members.fetch( {force: true} ).then(user => {
                                    user.forEach(user => {
                                        if (user.roles.cache.has(roleArg.value) == true) {
                                            //console.log(user.user.username)
                                            user.send(messageRoleArg.value)
                                        }
                                    })
                                });
                                return await interaction.reply({
                                    content:'Succesfully sent to '+ "<@&"+ roleArg.value +">",
                                    ephemeral:true
                                })
                        }
                    } else {
                        await interaction.reply({
                            content: "You are not able to send DM's now",
                            ephemeral: true
                        })
                    }
                    break;
                case 'roleall':
                    if (interaction.member.id === config.admin) {
                        const actionArg = options.get('action')
                        const roleArg = options.get('role')
                        switch (actionArg.value) {
                            case "add":
                                guild.members.fetch( {force: true} ).then(user => {
                                    user.forEach(user => {
                                        if (user.roles.cache.has(config.botRole) != true) {
                                            user.roles.add(roleArg.value)
                                        }
                                    });
                                })
                                await interaction.reply({
                                    content: "Sucessfully added",
                                    ephemeral:true
                                })
                                break;
                            case "remove":
                                guild.members.fetch( {force: true} ).then(user => {
                                    user.forEach(user => {
                                        if (user.roles.cache.has(config.botRole) != true) {
                                            user.roles.remove(roleArg.value)   
                                        }
                                    });
                                })
                                await interaction.reply({
                                    content: "Succesfully removed",
                                    ephemeral:true
            
                                })
                                break;
                        }
                        console.log("Executed /"+commandName + " (authorized)")
                    } else {
                        console.log("Executed /"+commandName + " (unauthorized)")
                        await interaction.reply({
                            content: "OK"
                        })
                    }
                    break;
                case 'play':
                    try {
                        if (options.getString('search').includes('https://deezer')) {
                            return await interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Unsupported link")]})
                        }
                        //console.log(songG);
                        client.distube.play( voiceChannel, options.getString('search'), { textChannel: channel, member: member })
                        return await interaction.reply({content: "\*\*Added\*\*! :arrow_down:"})
                        
                    } catch (errorPlay) {
                        return await interaction.reply({embed: [new MessageEmbed().setColor("RED").setDescription("Error: " + errorPlay)]})
                    }
                    
    
                case 'stop':
                    await queue.stop(voiceChannel)
                    queue = await client.distube.getQueue(voiceChannel)
                    return await interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("\*\*Stopped\*\* by <@" + interaction.member.user + ">")]})
    
                case 'skip':
                    try {
                        if (!queue) {
                            return await interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("There are no tracks to \*\*skip\*\*!")]})
                        }
                        else {
                            await queue.skip(voiceChannel)
                            queue = await client.distube.getQueue(voiceChannel)
                            return await interaction.reply({content: "\*\*Skipped\*\* to another track! :arrow_down:"})
                        }
                    } catch (errorSkip) {
                        return await interaction.reply({content:"Unsupported", ephemeral: true})
                    }
                    
    
                case 'queue':
                    var queue = await client.distube.getQueue(voiceChannel)
                    if (!queue) {
                        return await interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\*")], ephemeral:true})
                    }
                    else {
                        
                        return await interaction.reply({embeds: [new MessageEmbed().setColor("DARK_PURPLE").setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                            )]})
                    }
                case 'pause':
                    await queue.pause(voiceChannel)
                    return await interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Track has been \*\*paused\*\* by <@" + interaction.member.user + ">")]})
                case 'resume':
                    if (!queue) {
                        return await interaction.reply({embeds: [new MessageEmbed().setDescription("There is no \*\*queue\*\* or any track to be \*\*resumed\*\*")], ephemeral: true})
                    }
                    await queue.resume(voiceChannel)
                    return await interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Track has been \*\*resumed\*\* by <@" + interaction.member.user + ">")]})
                case 'volume':
                    const volumeNum = options.getNumber('percent')
                    if (volumeNum > 100 || volumeNum < 1) {
                        return await interaction.reply({embeds: [new MessageEmbed().setDescription("Use number between \*\*1\*\* and \*\*100\*\*")], ephemeral: true})
                    }
                    client.distube.setVolume(voiceChannel, volumeNum)
                    return await interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription(`Volume has been set to \`${volumeNum}%\``)]})
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