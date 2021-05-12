
module.exports = {
    name: 'cc',
    category: 'fun',
    aliases: ['cls'],
    run: async (client, message, args) => {
        if  (message.deletable) message.delete()
        const Delete = 15;
        message.channel.bulkDelete(Delete + 1);
        message.channel.send(`${client.user.username} KAMUI ${Delete} Messages` );
        
    }
}