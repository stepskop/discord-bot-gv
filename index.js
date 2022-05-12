const config = require('./config.json')
const {Client, Intents, MessageEmbed, CommandInteraction} = require( 'discord.js' );
const client = new Client( {intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES]} );
const command = require('./src/commandsBuilder')
const slashCommands = require('./src/slashCommandsBuilder')
const roleSelect = require('./src/role-select');
const { DisTube, default: dist, Song } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { VoiceConnection } = require('@discordjs/voice')

client.on('ready', () => {
    const guild = client.guilds.resolve("712268262347374632")
    client.user.setActivity("my real owner", { type: 'LISTENING'})
    console.log("OK")
    
    command(client, 'clearComm', 1, ' ', (message, args) => {
        if (message.author.id === "294676882081972226") {
            guild.commands.set([])
        }
    })
    slashCommands(client)
    roleSelect(client)
})


client.distube = new DisTube(client, {
    youtubeDL: false,
    plugins: [new YtDlpPlugin(), new SpotifyPlugin()]
})


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }
    const { commandName, options, member, channel } = interaction
    const guild = client.guilds.resolve("712268262347374632")
    const voiceChannel = member.voice.channel;
    console.log("User is in "+ voiceChannel)

<<<<<<< HEAD
    if (commandName === 'play' && !voiceChannel ||
     commandName === 'stop' && !voiceChannel|| 
     commandName === 'skip' && !voiceChannel|| 
     commandName === 'volume' && !voiceChannel|| 
     commandName === 'queue' && !voiceChannel|| 
     commandName === 'pause' && !voiceChannel|| 
     commandName === 'resume' && !voiceChannel) {
        let embed = new MessageEmbed()
        .setDescription("You must be in voice channel!")
        return interaction.reply({embeds: [embed]
        })
=======
    //Commands
    if (commandName === 'sendms') {
        if (interaction.member.id === '294676882081972226') {
            const roleArg = options.get('role')
            const messageArg = options.get('message')

            guild.members.fetch( {force: true} ).then(user => {
                user.forEach(user => {
                    if (user.roles.cache.has(roleArg.value) == true) {
                        console.log(user.user.username)
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
>>>>>>> e2fddacae0c82b1b9932ea0eea3fb719505541d5
    }
    if (commandName === 'play' && guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId||
     commandName === 'stop' && guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId|| 
     commandName === 'skip' && guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId|| 
     commandName === 'volume' && guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId|| 
     commandName === 'queue' && guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId|| 
     commandName === 'pause' && guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId|| 
     commandName === 'resume' && guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId) {
        let embed = new MessageEmbed()
        .setDescription(`Already playing in <#"+ ${guild.me.voice.channelId}`)
        return interaction.reply({embeds: [embed]
        })
    }
    var queue = await client.distube.getQueue(voiceChannel)
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
                        return interaction.reply({content:"Unsupported"})
                    }
                    client.distube.play( voiceChannel, options.getString('search'), { textChannel: channel, member:member })
                //console.log(options.get('search').value)
                    return interaction.reply({content:"Playing Requested"})
                } catch (errorPlay) {
                    return interaction.reply({content:"Unsupported"})
                }
                

            case 'stop':
                await queue.stop(voiceChannel)
                queue = await client.distube.getQueue(voiceChannel)
                return interaction.reply({content:"Stopped"})

            case 'skip':
                try {
                    if (!queue) {
                        return interaction.reply({content:"There is no tracks to skip"})
                    }
                    else {
                        await queue.skip(voiceChannel)
                        queue = await client.distube.getQueue(voiceChannel)
                        return interaction.reply({content: "Skipped to another track"})
                    }
                } catch (errorSkip) {
                    return interaction.reply({content:"Unsupported"})
                }
                

            case 'queue':
                
                if (!queue) {
                    return interaction.reply({content:"There is no queue"})
                }
                else {
                    //queue += await client.distube.getQueue(voiceChannel)
                    return interaction.reply({embeds: [new MessageEmbed().setColor("DARK_PURPLE").setDescription(`${queue.songs.map(
                        (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                        )]})
                }
            case 'pause':
                await queue.pause(voiceChannel)
                return interaction.reply({content: "Track has been paused"})
            case 'resume':
                await queue.resume(voiceChannel)
                return interaction.reply({content: "Track has been resumed"})
            case 'volume':
                const volumeNum = options.getNumber('percent')
                if (volumeNum > 100 || volumeNum < 1) {
                    return interaction.reply({content: "Use number between 1 and 100"})
                }
                client.distube.setVolume(voiceChannel, volumeNum)
                return interaction.reply({content: `Volume has been set to \`${volumeNum}%\``})
        }
    } catch (e) {
        const errorEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("Something went wrong. Error:"+ e)
        interaction.reply({embeds: [errorEmbed]})
    }
})

client.on('guildMemberAdd', guildMember => {
    console.log('User @' + guildMember.user.tag + ' has joined the server!');

    const autoRoles = ["Newbie", "◾⁣          Games           ⁣◾"]
    autoRoles.forEach(element => {
        const role = guildMember.guild.roles.cache.find((role) => role.name == element)
        guildMember.roles.add(role);
    });
});
client.login(config.token)