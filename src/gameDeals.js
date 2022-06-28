const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const fs = require('fs')
module.exports = (config, client) => {
    const channel = client.channels.cache.get(config.freeGamesChannel)
    const testChannel = client.channels.cache.get(config.testChannel)
    const trash = client.channels.cache.get('990689352755597422')
    
    setInterval(() => {
        testChannel.send("Requesting now, already known are:" + alreadyKnown + ' ,in config: ' + config.alreadyKnownGames)
        axios.get('https://www.gamerpower.com/api/filter?platform=epic-games-store.steam.gog.battlenet.ubisoft-connect.origin&sort-by=rarity&type=game')
        .then((res) => {
            const configUpdated = require('../config.json')
            let alreadyKnown = configUpdated.alreadyKnownGames
            let newKnown = []
            for (let index = 0; index < alreadyKnown.length; index++) {
                const knownId = alreadyKnown[index]
                for (let indexY = 0; indexY < Object.keys(res.data).length; indexY++) {
                        const foundId = res.data[indexY].id
                    if (knownId === foundId) {
                        newKnown.push(foundId)
                    } else if (foundId != knownId) {
                        testChannel.send("Not in list" + foundId)
                    }
                }
            }
            testChannel.send("Old already known: " + alreadyKnown)
            testChannel.send("NewKnown: " + newKnown)
            alreadyKnown = newKnown
            testChannel.send("New already known: " + alreadyKnown)

            for (let index = 0; index < Object.keys(res.data).length; index++) {
                const element = res.data[index]

                if (element.end_date === 'N/A' || alreadyKnown.includes(element.id)) {
                    continue
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
                    testChannel.send('Adding ' + element.id + ' to already known')
                    newKnown.push(element.id)
                    try {
                        let jsonString = fs.readFileSync('./config.json')
                        let configString = JSON.parse(jsonString)
                        configString.alreadyKnownGames = newKnown
                        fs.writeFileSync('./config.json', JSON.stringify(configString), err =>{})
                    } catch (error) {
                        console.log(error)
                    }
                }
                catch (error) {
                    testChannel.send(error)
                }
            }
            const newConfigUpdated = require('../config.json')
            testChannel.send('Request completed, already known are: '+ newKnown + ' ,in config: ' + newConfigUpdated.alreadyKnownGames)
        })
    }, 900000);
}