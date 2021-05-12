//const BaseCommand = require('../fun')

module.exports = {
    name: 'rps-game',
    aliases: ['game'],
    run: (client, message, args) => {
        const botChoice = Math.floor(Math.random() * 3) + 1;
        let botEmoji;
        let playerEmoji;
        let botChoiceStr;
        
        if(!args[0]) return;
        if(!['rock','paper','scissors'].includes(args[0])) return message.channel.send("không biết chơi oẳn tù tì à !");

        console.log(botChoice);

        if(botChoice == 1) {
            botChoiceStr = 'rock';
            botEmoji = ':punch: Rock';
        }
        if(botChoice == 2) {
            botChoiceStr = 'paper';
            botEmoji = ':raised_hand: Paper';
        }
        if(botChoice == 3) {
            botChoiceStr = 'scissors';
            botEmoji = ':v: Scissors';
        }

        if(args[0] == 'rock') playerEmoji = ':punch: Rock';
        if(args[0] == 'paper') playerEmoji = ':raised_hand: Paper';
        if(args[0] == 'scissors') playerEmoji = ':v: Scissors';

        
        if  (botChoiceStr == args[0]){ 
            return message.channel.send(`-BOT : ${botEmoji},\n -${message.author} : ${playerEmoji} .\n  TIE !`);
        }


        if(args[0] == 'rock'){
            if(botChoiceStr == 'paper') message.channel.send(`-BOT : ${botEmoji},\n -${message.author}: ${playerEmoji} . LOSE !`);
            else if (botChoiceStr == 'scissors') message.channel.send(`-BOT : ${botEmoji},\n -${message.author}: ${playerEmoji} . WON !`);
        }

        if(args[0] == 'paper'){
            if(botChoiceStr == 'rock') message.channel.send(`-BOT : ${botEmoji},\n -${message.author}: ${playerEmoji} . WON !`);
            else if (botChoiceStr == 'scissors') message.channel.send(`-BOT : ${botEmoji},\n -${message.author}: ${playerEmoji} . LOSE !`);
        }

        if(args[0] == 'scissors'){
            if(botChoiceStr == 'rock') message.channel.send(`-BOT : ${botEmoji},\n -${message.author}: ${playerEmoji} . LOSE !`);
            else if (botChoiceStr == 'scissors') message.channel.send(`-BOT : ${botEmoji},\n -${message.author}: ${playerEmoji} . WON !`);
        }
        
    }
}