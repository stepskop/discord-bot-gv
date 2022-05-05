const { prefix } = require('../config.json')
module.exports = (client, alias, argCount, callback) => {
    client.on('messageCreate', message => {
        const { content } = message;
        const command = prefix+alias
        const args = message.content.slice(command.length).trim().split(' ');
        if (content.startsWith(command) || content === command) {
            console.log("Executed "+command)
            if (args.length != argCount ) {
                console.log("Wrong args")
                return
            }
            if (args[0] === '')
            {
                console.log("Wrong args")
                return
            }
            callback(message, args)
        }
    })
 
}