module.exports = (config, client, interaction, guild) => {
    if (interaction.member.id === config.admin) {
        const actionArg = options.get('action')
        const roleArg = options.get('role')
        switch (actionArg.value) {
            case "add":
                guild.members.fetch( {force: true} ).then(user => {
                    user.forEach(user => {
                        if (user.roles.cache.has(config.botRole) != true) {
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
                        if (user.roles.cache.has(config.botRole) != true) {
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