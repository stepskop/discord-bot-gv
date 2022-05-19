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
                name: 'user',
                description: 'Send DM to specific user',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'user',
                        description: 'For what user the message is.',
                        required: true,
                        type: 'USER'
                    },
                    {
                        name: 'message',
                        description: 'Messge you want to send',
                        required: true,
                        type: 'STRING'
                    }
                ]
            },
            {
                name: 'role',
                description: 'Send DM to role (all users that haa the role)',
                type: 'SUB_COMMAND',
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
    commands.create({
        name: 'play',
        description: 'Plays a song',
        options: [
            {
                name: 'search',
                description: 'Use Name or URL',
                type: 'STRING',
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
                type: 'NUMBER',
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
}