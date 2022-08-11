const axios = require('axios')
module.exports = (config, client, arg) => {
    const testChannel = client.channels.cache.get(config.testChannel)

    switch (arg) {
        case 'off':
            try {
                axios({
                    method: 'post',
                    url: 'https://api.pushbullet.com/v2/pushes',
                    headers: {'access-token': process.env.PUSHBULLET_ACCESS_TOKEN},
                    data: {
                        "body": "shutdown",
                        "type": "note",
                        "title": "Push2Run"
                    }
                })
                .then((res) => {
                    if (res.status != 200) {
                        testChannel.send("Status wasn't 200 (While shuting down birthplae): " + res.data)
                        console.log(res.data)
                    } else if (res.status === 200 ) {
                    }
                })
            } catch (error) {
                testChannel.send('Something went wrong while shuting down')
                console.log(error)
            }
            break;
    
        case 'on':
            try {
                axios({
                    method: 'post',
                    url: 'https://api.pushbullet.com/v2/pushes',
                    headers: {'access-token': process.env.PUSHBULLET_ACCESS_TOKEN},
                    data: {
                        "body": "Heat the setup",
                        "type": "note",
                        "title": "Push2Run"
                    }
                })
                .then((res) => {
                    if (res.status != 200) {
                        testChannel.send("Status wasn't 200 (While heating up birthplae): " + res.data)
                        console.log(res.data)
                    } else if (res.status === 200 ) {
                    }
                })
            } catch (error) {
                testChannel.send('Something went wrong while heating up birthplace')
                console.log(error)
            }
            break;
    }
    
}