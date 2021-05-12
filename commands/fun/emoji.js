const {Util} = require('discord.js')
const { MessageEmbed } = require("discord.js")
const {parse} = require('twemoji-parser');

module.exports = {
    name: 'emoji',
    category: 'fun',
    aliases: ['emo'],
    run: (client, message, args) => {
        const emoji = args[0];
        if  (message.deletable) message.delete()
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

    }
}