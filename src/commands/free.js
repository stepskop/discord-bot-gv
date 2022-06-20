const axios = require('axios')
const {MessageEmbed} = require('discord.js')
module.exports = (client, callback) => {
    axios.get('https://www.gamerpower.com/api/filter?platform=epic-games-store.steam.gog.battlenet.ubisoft-connect.origin&sort-by=rarity&type=game')
    .then((res) => {
        const channel = client.channels.cache.get('982053578342559794') // #general
        const testChannel = client.channels.cache.get('971013689958363166')// #bot-testing
        var freeGameArray = []
        var freeGamesList = {
            embeds: []
        }
        for (let index = 0; index < Object.keys(res.data).length; index++) {
            const element = res.data[index]
            if (element.end_date === 'N/A') {
                return
            }
            //##########################################################
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
                const freeGame = new MessageEmbed()
                .setThumbnail('attachment://'+ thumbnailUrl)
                .setTitle(element.title)
                .setDescription('~~' + element.worth + '~~ **Free** until <t:'+ timeStamp +':d>' + ' •' + element.platforms.split(',')[1] +'\n\n[**Get it for free**]('+ element.open_giveaway+')')
                .setColor(0x36393f)
                .setImage(element.image)
                freeGameArray.push(freeGame)
                
                
                
            //##########################################################
            } 
            catch (error) {
                testChannel.send(error)
            }
        }

        freeGamesList.embeds.push(freeGameArray)
        
        channel.send({freeGamesList, 
            files: [{
                attachment:'src/gameDealsSrc/images'+thumbnailUrl,
                name: thumbnailUrl
            }]
        })

    })
    callback(freeGamesList, thumbnailUrl, element)
}