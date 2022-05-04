const config = require('./config.json')
const {Client, Intents} = require( 'discord.js' );
const client = new Client( {intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]} );
const command = require('./commandsBuilder')
const roleSelect = require('./role-select')

client.on('ready', () => {
    console.log('OK')
    
    command(client, 'game', (message) =>  {
        //const getEmoji = client.emojis.cache.get("956540916846444544")
        message.channel.send('<:apex:956540916846444544>')
        message.channel.send('Vibe')
    })
    roleSelect(client)

    command(client, 'sus', (message) => {
        message.channel.send('Ur mum sus')
    })
    // client.users.fetch('353767481531170818', false).then((user) => {
    //      user.send('did you wash your ass today?');
    // })
})
client.login(config.token)