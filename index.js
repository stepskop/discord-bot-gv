const config = require('./config.json')
const {Client, Intents} = require( 'discord.js' );
const client = new Client( {intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS]} );
const command = require('./src/commandsBuilder')
const slashCommands = require('./src/slashCommandsBuilder')
const roleSelect = require('./src/role-select');

client.on('ready', () => {
    const guild = client.guilds.resolve("712268262347374632")
    client.user.setActivity("my real owner", { type: 'LISTENING'})
    console.log("OK")
    
    command(client, 'clearComm', 2, ' ', (message, args) => {
        if (message.author.id === "294676882081972226") {
            guild.commands.set([])
        }
    })
    slashCommands(client)
    roleSelect(client)
})    
client.on('interactionCreate', async (interaction) => {
    const guild = client.guilds.resolve("712268262347374632")
    if (!interaction.isCommand()) {
        return
    }
    const { commandName, options } = interaction

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
    }
    else if (commandName === 'roleall') {
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