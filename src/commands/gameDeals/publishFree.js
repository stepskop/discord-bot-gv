const axios = require('axios')
const { EmbedBuilder } = require('discord.js')

module.exports = (config, client, interaction, options) => {
    if (interaction.member.id === config.admin) {
        function processLink(id) {
            axios.get("https://www.gamerpower.com/api/giveaway?id="+id).then((res)=>{

                let element = res.data
                if (element.status === "Expired") {
                    interaction.reply({
                        content: "This is already expired",
                        ephemeral: true
                    })
                    return
                }

                var timeStamp = new Date(element.end_date).getTime()/1000
                var thumbnailUrl = ''
                try {
                    switch (element.platforms.split(',')[1]) {

                        case ' GOG':
                            thumbnailUrl = 'gog.png'
                            break;
                        case ' Steam':
                            thumbnailUrl = 'steam.png'
                            break;
                        case ' Epic Games Store':
                            thumbnailUrl = 'epic.png'
                            break;
                        case ' Battle.net':
                            thumbnailUrl = 'battlenet.jpg'
                            break;
                        case ' Ubisoft Connect':
                            thumbnailUrl = 'ubisoft.png'
                            break;
                        case ' Origin':
                            thumbnailUrl = 'orign.png'
                            break;
                        default:
                            thumbnailUrl= 'other.svg'
                            testChannel.send('@Darkfoyet' + element)
                            break;
                    }
                    const freeGame = new EmbedBuilder()
                        .setThumbnail('attachment://'+ thumbnailUrl)
                        .setTitle(element.title)
                        .setDescription('~~' + element.worth + '~~ **Free** until <t:'+ timeStamp +':d>' + ' •' + element.platforms.split(',')[1] +'\n\n[**Get it for free**]('+ element.open_giveaway_url+')')
                        .setColor(0x36393f)
                        .setImage(element.image)
                    
                    const channel = client.channels.cache.get(config.freeGamesChannel)
                    channel.send({
                        embeds: [freeGame], 
                        files: [{
                            attachment:'src/gameDealsSrc/images/'+thumbnailUrl,
                            name: thumbnailUrl
                        }]
                    })
                    interaction.reply({
                        content: "**"+element.title+ "** has been published with link: \n" + element.open_giveaway_url,
                        ephemeral: true
                    })        
                } 
                catch (error) {
                    console.log(error)
                }
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status) {
                        interaction.reply({
                            content: error.response.data.status_message,
                            ephemeral: true
                        })
                    }
                } else {
                    console.log(error);
                }
            })
        }
        const id = options.get('id')
        processLink(id.value)
    } else {
        interaction.reply({
            content: "You are not able to publish custom game deals",
            ephemeral: true
        })
    }
}
