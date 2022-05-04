const { prefix } = require('./config.json')
module.exports = (client, alias, callback) => {
    client.on('messageCreate', message => {
        const { content } = message;
        const command = prefix+alias
        if (content.startsWith(command) || content === command) {
            console.log("Executed "+command)
            callback(message)
        }
    })
 
}