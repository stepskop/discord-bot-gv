const axios = require('axios')
const { EmbedBuilder } = require('discord.js')

module.exports = (config, client, database) => {
    const channel = client.channels.cache.get(config.freeGamesChannel)
    const testChannel = client.channels.cache.get(config.testChannel)

    try {
        setInterval(() => {  
            try {
                axios.get('https://www.gamerpower.com/api/filter?platform=epic-games-store.steam.gog.battlenet.ubisoft-connect.origin&sort-by=rarity&type=game')
            .then((res) => {
                const dbOperations = async () => {
                    try {
                        await database.connect()
                        const db = database.db('GVDB')
                        const coll = db.collection('GameDeals')
                        const mongoQuerry = await coll.findOne({ testIndex: 1 })
    
                        let alreadyKnown = mongoQuerry.games

                        let newKnown = []
    
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
                                        break;
                                }
                                const freeGame = new EmbedBuilder()
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
                                testChannel.send("Error while sending: " + error)
                            }
                        }
    
                        await coll.updateOne({testIndex: 1}, {$set: {games: alreadyKnown}})
                        const mongoQuerryUpdated = await coll.findOne({ testIndex: 1 })
                        //testChannel.send('Requesting done!, alreadyKnowns: ' + mongoQuerryUpdated.games)
                    } catch(e) {
                        console.log(e)
                    }
    
                }
                dbOperations()
            })
            .catch(() => {
                console.log("GGWP")
            })
            } catch (error) {
                console.log(error)
            }
        }, 900000);
    } catch (error) {
        console.log(error)
    }
}

