const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'helpcommand',
    category: 'user',
    aliases: ['help'],
    run: (client, message, args) => {
        const embed = new MessageEmbed().setColor("RANDOM");
        const link = message.channel.send(`
            Lệnh chỉnh nhạc :
            1.Phát nhạc: !play + tên nhạc.
            2.Dừng nhạc: !stop.
            3.Đổi sang bài tiếp theo: !skip.
            4.Lặp lại bài hát : !Onloop || !Onrepeat.
            4.Tắt lặp bài hát : !Offloop || !Offrepeat.
            5.Xem hàng chờ danh sách bài hát : !queue.

        `)
        embed.setTitle(link)
        return message.channel.send(embed);
    }
}