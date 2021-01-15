const TelegramBot   = require('node-telegram-bot-api');

class Bot extends TelegramBot {

    // stores the bot token
    #token;
    #chatId;
    #userName;

    constructor(token) {
        super();
        console.log(this)
    }

    getToken() {
        return this.#token;
    }

}


module.exports = { Bot };