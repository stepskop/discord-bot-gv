const axios = require('axios')
const { MessageEmbed } = require('discord.js')
module.exports = (config, client) => {
    const channel = client.channels.cache.get(config.freeGamesChannel)
    const testChannel = client.channels.cache.get(config.testChannel)

    var alreadyKnown = config.alreadyKnownGames
    setInterval(() => {
        axios.get('https://www.gamerpower.com/api/filter?platform=epic-games-store.steam.gog.battlenet.ubisoft-connect.origin&sort-by=rarity&type=game')
        .then((res) => {
            var newKnown = []
            for (let index = 0; index < alreadyKnown.length; index++) {
                const knownId = alreadyKnown[index]
                for (let indexY = 0; indexY < Object.keys(res.data).length; indexY++) {
                        const foundId = res.data[indexY].id
                    if (knownId === foundId) {
                        newKnown.push(foundId)
                    }
                }
            }
            alreadyKnown = newKnown
            for (let index = 0; index < Object.keys(res.data).length; index++) {
                const element = res.data[index]
                if (element.end_date === 'N/A' || alreadyKnown.includes(element.id)) {
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

                    channel.send({
                        embeds: [freeGame], 
                        files: [{
                            attachment:'src/gameDealsSrc/images/'+thumbnailUrl,
                            name: thumbnailUrl
                        }]})
                //##########################################################
                    alreadyKnown.push(element.id)
                } 
                catch (error) {
                    testChannel.send(error)
                }
            }
        })
    }, 3600000);
}