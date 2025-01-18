const axios = require('axios')
const { EmbedBuilder } = require('discord.js')
module.exports = (config, client, interaction) => {
    axios.get('https://www.gamerpower.com/api/filter?platform=epic-games-store.steam.gog.battlenet.ubisoft-connect.origin&sort-by=rarity&type=game')
    .then((res) => {
        const testChannel = client.channels.cache.get(config.testChannel)// #bot-testing

        let freeGameArray = []
        let freeGamesList = {
            embeds: [],
            files: [],
            ephemeral: true
        }
        for (let index = 0; index < Object.keys(res.data).length; index++) {
            const element = res.data[index]
            if (element.end_date === 'N/A') {
                continue;
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
                const freeGame = new EmbedBuilder()
                .setThumbnail('attachment://'+ thumbnailUrl)
                .setTitle(element.title)
                .setDescription('~~' + element.worth + '~~ **Free** until <t:'+ timeStamp +':d>' + ' •' + element.platforms.split(',')[1] +'\n\n[**Get it for free**]('+ element.open_giveaway+')')
                .setColor(0x36393f)
                .setImage(element.image)


                let attachments = {
                    attachment:'src/gameDealsSrc/images/'+thumbnailUrl,
                    name: thumbnailUrl
                }
                freeGameArray.push(freeGame)
                freeGamesList.files.push(attachments)
            //##########################################################
            } 
            catch (error) {
                console.log(error)
                testChannel.send(error)
            }
        }

        try {
            
            freeGameArray.slice().reverse().forEach(embed =>{
                freeGamesList.embeds.push(embed)
            })
            interaction.reply(freeGamesList)
        } catch (error) {
            console.log(error)
        }
    })
    
}
