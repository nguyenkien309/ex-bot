module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['p'],
    run: (client, message, args) => {
        message.channel.send(`${message.author} Summon Madara ! ${client.ws.ping} ms`)
        if  (message.deletable) message.delete()
    }
}