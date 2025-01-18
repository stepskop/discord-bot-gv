const {Client, GatewayIntentBits, EmbedBuilder, CommandInteraction, ReactionUserManager, Options, Colors} = require( 'discord.js' );
const client = new Client( {intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildEmojisAndStickers]} );
//const mongoose = require('mongoose')
const config = require('./config.json')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
dotenv.config()
//Start
client.on('ready', () => {
    const guild = client.guilds.resolve("712268262347374632")
    client.user.setActivity("/help", { type: 'LISTENING'})
    console.log("OK, running v1.7")
    
    const database = new MongoClient(process.env.MONGO_SRV)

    const command = require('./src/commandsBuilder')
    command(config, client, 'clearComm', 1, ' ', (message, args) => {
        if (message.author.id === config.admin) {
            guild.commands.set([])
        }
    })

    command(config, client, 'shutdown', 1, ' ', (message, args) => {
        if (message.author.id === "832731781231804447") { //IFTTT
            const testChannel = client.channels.cache.get(config.testChannel)
            testChannel.send({embeds: [new EmbedBuilder().setColor(Colors.Orange).setTitle('Shuting down my birthplace...')]})
            //const birthplace = require('./src/birthplace')
            //birthplace(config, client, 'off')
        }
    })

    //Slash commands - builder
    const slashCommands = require('./src/slashCommandsBuilder')
    slashCommands(config, client)
    //Game Deals
    const gameDeals = require('./src/gameDeals')
    gameDeals(config, client, database)
    //MC Server Status
    // const mcServerStatus = require('./src/mcServerStatus')
    // mcServerStatus(config, client)
    //Role select
    const roleSelect = require('./src/roleSelect');
    roleSelect(config, client)
    //Verification
    //const verify = require('./src/verify')
    //verify(config, client)
})
//Distube - init
const { DisTube, default: dist, Song } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { YouTubePlugin } = require("@distube/youtube")
const { VoiceConnection } = require('@discordjs/voice')
client.distube = new DisTube(client, {
     emitNewSongOnly: true,
     emitAddSongWhenCreatingQueue: false,
     emitAddListWhenCreatingQueue: false,
     joinNewVoiceChannel: true,
     ffmpeg: {
	args: "-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5 -vn"
     },
     plugins: [new SpotifyPlugin(), new YtDlpPlugin(), new YouTubePlugin()]
})
//Distube - music
const disTubeInfo = require('./src/distube')
disTubeInfo(config, client)
//Slash Commands - exec
const interactions = require('./src/interactions')
interactions(config, client)
//Role on join
//const onJoin = require('./src/onJoin')
//onJoin(config, client)
//Auth login
client.login(process.env.TOKEN)


