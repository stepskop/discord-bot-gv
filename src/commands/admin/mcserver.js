const axios = require('axios')
const { MessageEmbed } = require('discord.js')
module.exports = (config, client, interaction, guild, options) => {
    const testChannel = client.channels.cache.get(config.testChannel)
    if (interaction.member.roles.cache.has('905501025211924532')) {       
        switch (options.getSubcommand()) {

            case 'start':
                if (interaction.member.id === config.admin) {
                  try {
                        //PUSHBULLET REQUEST
                        axios({
                            method: 'post',
                            url: 'https://api.pushbullet.com/v2/pushes',
                            headers: {'access-token': process.env.PUSHBULLET_ACCESS_TOKEN},
                            data: {
                                "body": "start mc server",
                                "type": "note",
                                "title": "Push2Run"
                            }
                        })
                        .then((res) => {
                            if (res.status != 200) {
                                testChannel.send("Status wasn't 200 (While requesting to start): " + res.data)
                                console.log(res.data)
                            } else if (res.status === 200 ) {
                            }
                        })
                        interaction.reply({embeds: [new MessageEmbed().setTitle('Server starting!').setColor('DARKER_GREY').setDescription("<t:"+Math.floor(new Date().getTime() / 1000)+ ":d> at <t:"+ Math.floor(new Date().getTime() / 1000)+ ":t>")], ephemeral: true})  
                    } catch (error) {
                        interaction.reply({embeds:[new MessageEmbed().setColor('RED').setDescription('Something went wrong: '+ error)]})
                    }   
                } else {
                    interaction.reply({embeds: [new MessageEmbed().setDescription("You are not permitted to start our Minecraft server")], ephemeral: true})
                }
                break;
        
//SECOND SUBCOMMAND
            case 'ip':
                try {
                    //NGROK REQUEST
                    axios({
                        method: 'get',
                        url: 'https://api.ngrok.com/tunnels',
                        headers: {'authorization': 'Bearer '+process.env.NGROK_AUTH, 'ngrok-version':'2'}
                    })
                    .then((res) => {
                        if (res.status != 200) {
                            testChannel.send("Status wasn't 200 (While requesting IP): " + res.data)
                            console.log(res.data)
                            interaction.reply({embeds: [new MessageEmbed().setTitle('Server is offline').setDescription('...or i am broken')], ephemeral: true})
                        }
                        else if (Array.isArray(res.data.tunnels) && res.data.tunnels.length) {  
                            const fullIp = res.data.tunnels[0].public_url.slice(6)
                            interaction.reply({embeds: [new MessageEmbed().setColor('DARK_GREEN').setTitle('<:mc:971451702341414953> Server is on!').setDescription('\nIP is:\n**'+fullIp+'**\n\n' + "<t:"+ Math.floor(new Date().getTime() / 1000)+ ":d> at <t:"+ Math.floor(new Date().getTime() / 1000)+ ":t>")], ephemeral: true})
                        } else {
                            interaction.reply({embeds: [new MessageEmbed().setTitle('Server is offline').setDescription('...or i am broken')], ephemeral: true})
                        }
                    })
                } catch (error) {
                    interaction.reply({embeds:[new MessageEmbed().setColor('RED').setDescription('Something went wrong: '+ error)]})
                }
                break;
        }
    } else {
        interaction.reply({content: "You don't have acces to our Minecraft server, but you can ask for it in <#958795251735224390>", ephemeral: true})
    }
}