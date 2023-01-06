module.exports = (config, client, interaction, guild, options) => {
    try {
        if (interaction.member.id === config.admin) {
            switch (options.getSubcommand()) {
                case 'user':
                    const userArg = options.getUser('user')
                    const messageUserArg = options.get('message')
                    userArg.send(messageUserArg.value)
    
                    return interaction.reply({
                        content:'Succesfully sent to ' + "<@"+ userArg + ">",
                        ephemeral:true
                    })
                case 'role':
                    const roleArg = options.get('role')
                    const messageRoleArg = options.get('message')
                    guild.members.fetch( {force: true} ).then(user => {
                        user.forEach(user => {
                            if (user.roles.cache.has(roleArg.value) == true) {
                                //console.log(user.user.username)
                                user.send(messageRoleArg.value)
                            }
                        })
                    });
                    return interaction.reply({
                        content:'Succesfully sent to '+ "<@&"+ roleArg.value +">",
                        ephemeral:true
                    })
            }
        } else {
            interaction.reply({
                content: "You are not able to send DM's now",
                ephemeral: true
            })
        }
    } catch (error) {
        console.log(error);
    }
}