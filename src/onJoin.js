const { MessageEmbed } = require('discord.js')
module.exports = (config, client) => {
    client.on('guildMemberAdd', guildMember => {
        console.log('User @' + guildMember.user.tag + ' has joined the server!');
    
        const autoRoles = config.rolesOnJoin

        if (guildMember.user.bot) {
            const role = guildMember.guild.roles.cache.find((role) => role.id == '785986410032791612')
            guildMember.roles.add(role);
        }
        else {
            autoRoles.forEach(element => {
                const role = guildMember.guild.roles.cache.find((role) => role.id == element)
                guildMember.roles.add(role);
            });
        }
        try {
            if (!guildMember.user.bot) {
                guildMember.send({embeds: [new MessageEmbed().setTitle('Vítej na GameVibe').setColor('DARK_PURPLE').setDescription('Doufám že se ti tu bude líbit' + '\n\n' + 'Aby ostaní věděli co hraješ, vyber si role v **#🎮game-select🎮**' + '\n\n' + '*GameVibe*')]})
            }
            else{
                console.log("this is the bot, so i will not send dms");
            }
        } catch (error) {
            console.log(error);
        }
    });
}