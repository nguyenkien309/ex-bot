const axios = require('axios');


module.exports = {
    name: 'chat',
    aliases: ['chatbot'],
    category: 'fun',
    run: async (client, message, args) => {
        try {
            const res = await axios.get(`http://api.brainshop.ai/get?bid=156056&key=UcAkBtyKR9JTrhFY&uid=1&msg=${encodeURIComponent(args.join(' '))}`);
                message.channel.send(res.data.cnt);
        }
        catch(e) {
            message.channel.send("got an error !");
        }
    }
}