//npm i ffmpeg-static @discordjs/opus google-tts-api
const { getAudioUrl} = require('google-tts-api');

module.exports = {
    name: 'speakbot',
    aliases: ['talk'],
    category: 'fun',
    run: async (client, message, args) => {
        if  (message.deletable) message.delete()
        if(!args[0]) return;
        const string = args.join(' ');
        if(string.length >200) return message.channel.send("Bìmh tỉmh bủh");
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) message.reply('vao room di');
        const audioURL = await getAudioUrl(string, {
            lang: 'vi',
            slow: false,
            host: 'http://translate.google.com',
            timeout: 10000,
        });
        try {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(audioURL);
                dispatcher.on('finish', () => {
                    voiceChannel.leave();
                });
            });
        }
        catch(e) {
            message.channel.send('got an error !');
            console.error(e);
        }
    },
}