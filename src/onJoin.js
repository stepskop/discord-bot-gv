const { MessageEmbed } = require('discord.js')
module.exports = (config, client) => {
    client.on('guildMemberAdd', guildMember => {
        console.log('User @' + guildMember.user.tag + ' has joined the server!');
    
        const autoRoles = config.rolesOnJoin
        autoRoles.forEach(element => {
            const role = guildMember.guild.roles.cache.find((role) => role.id == element)
            guildMember.roles.add(role);
        });
        guildMember.send({embeds: [new MessageEmbed().setTitle('Vítej na GameVibe').setColor('DARK_PURPLE').setDescription('Doufám že se ti tu bude líbit' + '\n\n' + 'Aby ostaní věděli co hraješ, vyber si role v **#🎮game-select🎮**' + '\n\n' + '*GameVibe*')]})
    });
}