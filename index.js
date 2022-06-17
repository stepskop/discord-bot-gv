const {Client, Intents, MessageEmbed, CommandInteraction, ReactionUserManager, Options} = require( 'discord.js' );
const client = new Client( {intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS]} );
require("dotenv").config()
//Start
client.on('ready', () => {
    const guild = client.guilds.resolve("712268262347374632")
    client.user.setActivity("my real owner", { type: 'LISTENING'})
    console.log("OK")
    
    const command = require('./src/commandsBuilder')
    command(client, 'clearComm', 1, ' ', (message, args) => {
        if (message.author.id === "294676882081972226") {
            guild.commands.set([])
        }
    })
    //Slash commands - builder
    const slashCommands = require('./src/slashCommandsBuilder')
    slashCommands(client)
    //Game Deals
    const gameDeals = require('./src/gameDeals')
    gameDeals(client)
    //Role select
    const roleSelect = require('./src/roleSelect');
    roleSelect(client)
    //Verification
    const verify = require('./src/verify')
    verify(client)
})
//Distube - init
const { DisTube, default: dist, Song } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { VoiceConnection } = require('@discordjs/voice')
client.distube = new DisTube(client, {
    youtubeDL: false,
    plugins: [new YtDlpPlugin(), new SpotifyPlugin()]
})
//Distube - muscic
const disTubeInfo = require('./src/distube')
disTubeInfo(client)
//Slash Commands - exec
const interactions = require('./src/interactions')
interactions(client)
//Role on join
const onJoin = require('./src/onJoin')
onJoin(client)
//Auth login
client.login(process.env.TOKEN)