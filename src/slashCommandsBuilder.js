const {} = require('discord.js')


module.exports = (config, client) => {
    const guild = client.guilds.resolve(config.guild)
    let commands;
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application.commands
    }

    commands.create({
        name: 'pc',
        description: 'Operate with birthplace',
        defaultPermission: false,
        options: [
            {
                name: 'on',
                description: 'Heats up the birthplace',
                type: 1
            },
            {
                name: 'off',
                description: 'Shuts down the birthplace',
                type: 1 
            }
        ]
    })

    commands.create({
        name: 'mcserver',
        description: 'Operate with mcserver',
        defaultPermission: false,
        options: [
            {
                name: 'start',
                description: 'Start your server and get IP',
                type: 1
            },
            {
                name: 'ip',
                description: 'Get IP',
                type: 1 
            }
        ]
    })

    commands.create({
        name: 'sendms',
        description: '1. Sends direct message',
        defaultPermission: false,
        options: [
            {
                name: 'user',
                description: 'Send DM to specific user',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'For what user the message is.',
                        required: true,
                        type: 6
                    },
                    {
                        name: 'message',
                        description: 'Messge you want to send',
                        required: true,
                        type: 3
                    }
                ]
            },
            {
                name: 'role',
                description: 'Send DM to role (all users that haa the role)',
                type: 1,
                options: [
                    {
                        name: 'role',
                        description: 'For what role the message is.',
                        required: true,
                        type: 8
                    },
                    {
                        name: 'message',
                        description: 'Messge you want to send',
                        required: true,
                        type: 3
                    }
                ]
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
                type: 3,
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
                type: 8,
            }
        ]
    })
    commands.create({
        name: 'play',
        description: 'Plays a song',
        options: [
            {
                name: 'search',
                description: 'Use Name or URL',
                type: 3,
                required: true,
            }
        ]
    })
    commands.create({
        name: 'stop',
        description: 'Stops a playing music'
    })
    commands.create({
        name: 'skip',
        description: 'Skips to another track in queue'
    })
    commands.create({
        name: 'volume',
        description: 'Alter the volume',
        options: [
            {
                name: 'percent',
                description: '10 = 10%',
                type: 10,
                required: true,
            }
        ]
    })
    commands.create({
        name: 'queue',
        description: 'Shows a queue of tracks'
    })
    commands.create({
        name: 'pause',
        description: 'Pauses the track'
    })
    commands.create({
        name: 'resume',
        description: 'Resumes the track'
    })
    commands.create({
        name: 'help',
        description: 'List of all commands'
    })
    commands.create({
        name: 'free',
        description: 'Gives you hot game deals (sales)'
    })
    commands.create({
        name: 'publishdlc',
        description: 'Send specific game deal',
        options: [
            {
                name: "id",
                description: "Gamepover API deal",
                type: 3,
                required: true
            }
        ]
    })

}
