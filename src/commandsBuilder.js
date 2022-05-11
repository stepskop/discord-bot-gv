const { prefix } = require('../config.json')
module.exports = (client, alias, argCount, splitAfter, callback) => {
    client.on('messageCreate', message => {
        const { content } = message;
        const command = prefix+alias
        const args = message.content.slice(command.length).trim().split(splitAfter);
        if (content.startsWith(command) || content === command) {
            console.log("Executed "+command)
            if (argCount === 1) {
                if (args.length != argCount) {
                    console.log("Wrong args")
                    return
                } else if (args[0] != '') {
                    console.log("Wrong args")
                    return
                }
            }
            else if (argCount > 1) {
                if (args.length != argCount-1) {
                    console.log("Wrong args")
                    return
                } else if (args[0] === '') {
                    console.log("Wrong args")
                    return
                }
                args.forEach(element => {
                    if (element === '') {
                        console.log("Wrong args")
                        return
                    } 
                });
                
            }
            callback(message, args)
        }
    })
 
}