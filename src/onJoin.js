const {} = require('discord.js')
module.exports = (config, client) => {
    client.on('guildMemberAdd', guildMember => {
        console.log('User @' + guildMember.user.tag + ' has joined the server!');
    
        const autoRoles = config.rolesOnJoin
        autoRoles.forEach(element => {
            const role = guildMember.guild.roles.cache.find((role) => role.id == element)
            guildMember.roles.add(role);
        });
    });
}