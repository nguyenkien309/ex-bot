//npm i twemoji-parser
const {Collection} = require('discord.js');
const Discord = require('discord.js')
const client = new Discord.Client();
const {token} = require('./config.json');
const {parse} = require('twemoji-parser');

//
const Distube = require('distube');
const distube = new Distube(client, {searchSongs: true, emitNewSongOnly: true });
//

client.on("ready", ()=>{
    console.log(`${client.user.username} is ready`);

    client.user.setPresence({
        activity: {
            name: "phim sex",
            type: 'WATCHING',
            
        },
        status: 'online'
        
    })
})

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler =>{
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
    if (message.author.bot) return; //user is bot 
    const prefix = '!'
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const opt = args.shift();

    let command = client.commands.get(opt);
    if(!command) command = client.commands.get(client.aliases.get(opt));
    if(command) command.run(client, message, args);

    
    if(opt == "play") {
        const voiceChannel = message.member.voice.channel
        //if  (message.deletable) message.delete()
        if(!voiceChannel) return message.channel.send("Vào room đi ");
        if(!args[0]) return message.channel.send("thêm tên nhạc nhé bủh ");
        distube.play(message, args.join(' '));
    }

    if(opt == "stop") {
        if(!message.member.voice.channel) return message.channel.send("SUSANOO !!! ")
                     message.member.voice.channel.leave()
                     return;
    }

    if (opt == "skip")  distube.skip(message);

    if (["Onrepeat", "Onloop"].includes(opt)) {
        distube.setRepeatMode(message, parseInt(args[0]));
        message.reply('Đã bật loop');
    }
    if (["Offrepeat", "Offloop"].includes(opt)) {
        distube.setRepeatMode(message, parseInt(args[0]));
        message.reply('Đã tắt loop');
    }
        

    if (opt == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Danh sách hàng đợi :\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(opt)) {
        let filter = distube.setFilter(message, opt);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
    //
});
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Đã thêm :${song.name} - \`${song.formattedDuration}\` vào hàng đợi ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Phát \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nBy User: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Đã thêm :\`${playlist.name}\` playlist (${playlist.songs.length} songs) vào hàng đợi\n${status(queue)}`
    ))
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Chọn bài hát**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n`);
    })
    .on("searchCancel", (message) => message.channel.send(`đã hủy tìm kiếm`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("Lỗi: " + e);
    //
/*
    switch(opt) {
        case "ping":
            message.channel.send(`${message.author} Im here ! ${client.ws.ping} ms`)
            break;

        case "say":
        if  (message.deletable) message.delete()
        message.channel.send(args.join(' ')) //join tach -> chuoi
        break;

        case "avt":
            const member = message.mentions.members.first() || message.guild.cache.get(args[0]) || message.member
            const URL = member.user.avatarURL({format: 'jpg', dynamic: true, size: 1024 })
            if  (message.deletable) message.delete()
            const avatarEmbed = new MessageEmbed()
            .setImage(URL).setImage(URL)
            .setTitle(`${member.user.username}`)
            .setColor("RANDOM")
            message.channel.send(avatarEmbed)
            if(!URL) message.channel.send(` ${member.user} Đổi avatar đi con lợn này !`)
            break;

        case "emoji":
            const emoji = args[0];
            if(!emoji) return message.channel.send(`${member.user.username}  nhập emoji đi`);

            let custom = Util.parseEmoji(emoji);
            const embed = new MessageEmbed()
            //.setTitle(`${emoji}`)
            .setColor("RANDOM");

            if(custom.id) {
                let link = `http://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
                embed.setImage(link)
                    //.setFooter(`emoji ID : ${custom.id}`);
                return message.channel.send(embed);
            }
            else {
                let parsed = parse(emoji, {assetType: 'png'});
                if  (!parsed[0]) return;
                embed.setImage(parsed[0].url);
                return message.channel.send(embed);
            }
            break;
      
    }
    */
})


client.login(token)