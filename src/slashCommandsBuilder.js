const {} = require('discord.js')


module.exports = (client) => {
    const guild = client.guilds.resolve("712268262347374632")
    let commands;
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application.commands
    }
    commands.create({
        name: 'sendms',
        description: '1. Sends direct message',
        defaultPermission: false,
        options: [
            {
                name: 'role',
                description: 'For what role the message is.',
                required: true,
                type: 'ROLE'
            },
            {
                name: 'message',
                description: 'Messge you want to send',
                required: true,
                type: 'STRING'
            }
        ]
    })
    commands.create({
        name: 'roleall',
        description: 'Give role to all',
        defaultPermission: false,
        options: [
            {
                name: 'action',
                description: 'Add or Remove',
                required: true,
                type: 'STRING',
                choices: [
                    {
                        name: "Add",
                        value: "add"
                    },
                    {
                        name: "Remove",
                        value: "remove"
                    }
                ]
            },
            {
                name: 'role',
                description: 'Which role do you giving',
                required: true,
                type: 'ROLE',
            }
        ]
    })
}