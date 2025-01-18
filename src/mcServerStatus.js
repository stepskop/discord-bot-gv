const { EmbedBuilder } = require('discord.js')
const axios = require('axios')
module.exports = (config, client) => {
    const testChannel = client.channels.cache.get(config.testChannel)
    const channel = client.channels.cache.get('1007077590638538772')
    setInterval(() => {
        try {
            axios({
                method: 'get',
                url: 'https://api.ngrok.com/tunnels',
                headers: {'authorization': 'Bearer '+process.env.NGROK_AUTH, 'ngrok-version':'2'}
            })
            .then((res) => {
                if (res.status != 200) {
                    testChannel.send("Status wasn't 200 (While requesting IP): " + res.data)
                    console.log(res.data)
                }
                if (Array.isArray(res.data.tunnels) && res.data.tunnels.length) {
                    const fullIp = res.data.tunnels[0].public_url.slice(6)
                    channel.messages.fetch().then((messages) => {
                        if (messages.size != 0) {
                            for (const message of messages) {
                                if (message[1].embeds[0].color != 2067276) {
                                    message[1].delete()
                                    channel.send({content: "<@&905501025211924532>", embeds: [new EmbedBuilder()
                                        .setColor('DARK_GREEN')
                                        .setTitle('<:mc:971451702341414953> Server is on!')
                                        .setDescription('\n*IP is*:\n\n**`'+fullIp+'`**\n\n' + "<t:"+ Math.floor(new Date().getTime() / 1000)+ ":d> at <t:"+ Math.floor(new Date().getTime() / 1000)+ ":t>\n\n")]})
                                }
                                
                            }
                        }
                    })
                }
                else if (!Array.isArray(res.data.tunnels) || !res.data.tunnels.length) {
                    channel.messages.fetch().then((messages) => {
                        if (messages.size != 0) {  
                            for (const message of messages) {
                                if(message[1].embeds[0].color == 2067276) {
                                    message[1].delete()
                                    channel.send({embeds: [ new EmbedBuilder()
                                        .setColor('DARK_RED')
                                        .setTitle('Server is currently offline')
                                        .setDescription('Since '+ "<t:"+ Math.floor(new Date().getTime() / 1000)+ ":d> <t:"+ Math.floor(new Date().getTime() / 1000)+ ":t>")]})
                                }
                            }
                        }
                    })
                    
                }
            })
        } catch (error) {
            console.log(error)

        }
    }, 5000);
}
