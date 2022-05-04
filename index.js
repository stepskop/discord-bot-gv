const config = require('./config.json')
const {Client, Intents} = require( 'discord.js' );
const client = new Client( {intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,]} );
const command = require('./commandsBuilder')
const roleSelect = require('./role-select')

client.on('ready', () => {
    console.log('OK')
    
    command(client, 'game', (message) =>  {
        message.channel.send('Vibe')
    })
    roleSelect(client)

    command(client, 'sus', (message) => {
        message.channel.send('Ur mum sus')
    })
})



// client.on('guildMemberAdd', guildMember => {
//     console.log('User @' + guildMember.user.tag + ' has joined the server!');
//     const role = guildMember.guild.roles.cache.find((role) => role.name === "Newbie" )
//     console.log(role)
//     guildMember.roles.add(role);

    // const autoRoles = ["Newbie", "◾⁣          Games           ⁣◾"]
    // autoRoles.forEach(element => {
    //     const role = member.guild.roles.cache.find(role => role.name == element)
    //     console.log(role)
    //     member.roles.add(role);
    // });
// });
client.login(config.token)