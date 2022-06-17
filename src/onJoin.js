const {} = require('discord.js')
module.exports = (client) => {
    client.on('guildMemberAdd', guildMember => {
        console.log('User @' + guildMember.user.tag + ' has joined the server!');
    
        const autoRoles = ["Need to be verified", "◾⁣          Games           ⁣◾", "◾⁣         Platform          ⁣◾", "◾⁣       Special Acces        ⁣◾"]
        autoRoles.forEach(element => {
            const role = guildMember.guild.roles.cache.find((role) => role.name == element)
            guildMember.roles.add(role);
        });
    });
}