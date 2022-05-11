const config = require('./config.json')
const {Client, Intents, GuildMember, User} = require( 'discord.js' );
const client = new Client( {intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS]} );
const command = require('./src/commandsBuilder')
const roleSelect = require('./src/role-select')

client.on('ready', () => {
    const guild = client.guilds.resolve("712268262347374632")
    console.log('OK')
    client.user.setActivity("my real owner", { type: 'LISTENING'})
    
    command(client, 'game', 0, (message) =>  {
        message.channel.send('Vibe')
    })
    roleSelect(client)
    guild.members.fetch( {force: true} ).then(user => {
        user.forEach(user => {
            //Pirati: 954478395536850954
            //Testers: 973854832492412948
            if (user.roles.cache.has("973854832492412948") == true) {
                console.log(user.user.username)
                //user.send("V sobotu 14.5. (tento týden) je v Sea of Thieves komunitní den, pro nás znamená to jediné, Trojnásobnou Reputaci a Zlato. Chceme toho co nejvíce využít. Na sobotu tímto plánujeme Alianci.\nhttps://discord.com/events/712268262347374632/973494531230171156\nveškeré sdíleni (https://gamevibe.netlify.com/) mezi další známé piráty vítáno")
            }
    })});

    command(client, 'roleall', 2, (message, args) => {
        if (message.author.id === "294676882081972226") {
            const role = guild.roles.cache.find((role) => role.id === args[1])
            if (args[0] === "add") {
                guild.members.fetch( {force: true} ).then(user => {
                    user.forEach(user => {
                        if (user.roles.cache.has("785986410032791612") != true) {
                            user.roles.add(role)   
                        }
                    });
                })
                message.channel.send("Succesfully added")
            }
            else if (args[0] === "remove") {
                guild.members.fetch( {force: true} ).then(user => {
                    user.forEach(user => {
                        if (user.roles.cache.has("785986410032791612") != true) {
                            user.roles.remove(role)   
                        }
                    });
                })
                message.channel.send("Succesfully removed")
            }
            else{
                message.channel.send("Wrong args 2")
            }
        }
    })
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