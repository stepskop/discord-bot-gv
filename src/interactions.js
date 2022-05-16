const { MessageEmbed } = require('discord.js')
const { Song } = require('distube')
const distube = require('./distube')
module.exports = (client) => {
    
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return
        }
        
        const { commandName, options, member, channel } = interaction
        
        // console.log(interaction.channel.id)
        const guild = client.guilds.resolve("712268262347374632")
        const voiceChannel = member.voice.channel;
        //console.log(typeof interaction.member.user.tag)
        console.log("Executed /"+commandName+ " by "+ interaction.member.user.tag + " ("+ interaction.member.user.username + ")")
        if (commandName === 'play'||
        commandName === 'stop'|| 
        commandName === 'skip'|| 
        commandName === 'volume'|| 
        commandName === 'queue'|| 
        commandName === 'pause'|| 
        commandName === 'resume') {
            const allowedChannel = ["823638576616833084", "971013689958363166"]
            const usedChannel = interaction.channel.id
            
            if (usedChannel === allowedChannel[0] || usedChannel === allowedChannel[1]) {
                if (!voiceChannel) {
                    let embed = new MessageEmbed()
                    .setDescription("You must be in voice channel!")
                    console.log('User is NOT in voice')
                    return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                } else if (voiceChannel) {
                    var queue = client.distube.getQueue(voiceChannel)
                }
                if (guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId) {
                    let embed = new MessageEmbed()
                    .setDescription(`Already playing in <#"+ ${guild.me.voice.channelId}`)
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
                        return interaction.reply({embeds: [new MessageEmbed().setDescription("There is no queue or any track playing")], ephemeral: true})
                    }
                }
            } else {
                return interaction.reply({
                    embeds: [new MessageEmbed().setDescription("Use propper text channel ( <#823638576616833084> )")],
                    ephemeral: true
                })
            }
        }
        try {
            switch (commandName) {
                case 'sendms':
                    if (interaction.member.id === '294676882081972226') {
                        const roleArg = options.get('role')
                        const messageArg = options.get('message')
                        // console.log(roleArg.value)
                        // console.log(messageArg.value)
            
                        guild.members.fetch( {force: true} ).then(user => {
                            user.forEach(user => {
                                if (user.roles.cache.has(roleArg.value) == true) {
                                    //console.log(user.user.username)
                                    user.send(messageArg.value)
                                }
                            })
                        });
            
                        interaction.reply({
                            content:'AdminSucces',
                            ephemeral:true
                        })
                    } else {
                        interaction.reply({
                            content: "OK"
                        })
                    }
                    break;
                case 'roleall':
                    if (interaction.member.id === '294676882081972226') {
                        const actionArg = options.get('action')
                        const roleArg = options.get('role')
                        switch (actionArg.value) {
                            case "add":
                                guild.members.fetch( {force: true} ).then(user => {
                                    user.forEach(user => {
                                        if (user.roles.cache.has("785986410032791612") != true) {
                                            user.roles.add(roleArg.value)
                                        }
                                    });
                                })
                                interaction.reply({
                                    content: "Sucessfully added",
                                    ephemeral:true
                                })
                                break;
                            case "remove":
                                guild.members.fetch( {force: true} ).then(user => {
                                    user.forEach(user => {
                                        if (user.roles.cache.has("785986410032791612") != true) {
                                            user.roles.remove(roleArg.value)   
                                        }
                                    });
                                })
                                interaction.reply({
                                    content: "Succesfully removed",
                                    ephemeral:true
            
                                })
                                break;
                        }
                        console.log("Executed /"+commandName + " (authorized)")
                    } else {
                        console.log("Executed /"+commandName + " (unauthorized)")
                        interaction.reply({
                            content: "OK"
                        })
                    }
                    break;
                case 'play':
                    try {
                        if (options.getString('search').includes('https://deezer')) {
                            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("Unsupported link")]})
                        }
                        //console.log(songG);
                        client.distube.play( voiceChannel, options.getString('search'), { textChannel: channel, member: member })
                        return interaction.reply({content: "Added to queue! :arrow_down:"})
                        
                    } catch (errorPlay) {
                        return interaction.reply({embed: [new MessageEmbed().setColor("RED").setDescription("Error: " + errorPlay)]})
                    }
                    
    
                case 'stop':
                    await queue.stop(voiceChannel)
                    queue = await client.distube.getQueue(voiceChannel)
                    return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Stopped")]})
    
                case 'skip':
                    try {
                        if (!queue) {
                            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("There are no tracks to skip!")]})
                        }
                        else {
                            await queue.skip(voiceChannel)
                            queue = await client.distube.getQueue(voiceChannel)
                            return interaction.reply({content: "Skipped to another track! :arrow_down:"})
                        }
                    } catch (errorSkip) {
                        return interaction.reply({content:"Unsupported"})
                    }
                    
    
                case 'queue':
                    var queue = await client.distube.getQueue(voiceChannel)
                    if (!queue) {
                        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("There is no queue")]})
                    }
                    else {
                        
                        return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_PURPLE").setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                            )]})
                    }
                case 'pause':
                    await queue.pause(voiceChannel)
                    return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Track has been paused")]})
                case 'resume':
                    if (!queue) {
                        return interaction.reply({embeds: [new MessageEmbed().setDescription("There is no queue or any track to be resumed")], ephemeral: true})
                    }
                    await queue.resume(voiceChannel)
                    return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription("Track has been resumed")]})
                case 'volume':
                    const volumeNum = options.getNumber('percent')
                    if (volumeNum > 100 || volumeNum < 1) {
                        return interaction.reply({embeds: [new MessageEmbed().setDescription("Use number between 1 and 100")], ephemeral: true})
                    }
                    client.distube.setVolume(voiceChannel, volumeNum)
                    return interaction.reply({embeds: [new MessageEmbed().setColor("PURPLE").setDescription(`Volume has been set to \`${volumeNum}%\``)]})
            }
        } catch (e) {
            console.log(e)
            if (e.errorCode === "RESUMED") {
                interaction.reply({embeds: [new MessageEmbed().setDescription("There is no paused track")], ephemeral:true})
            } else {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Something went wrong. Error: "+ e)
            interaction.reply({embeds: [errorEmbed], ephemeral:true})
            }
        }
    })
}