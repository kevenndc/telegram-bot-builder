const TelegramBot   = require('node-telegram-bot-api');
const env           = require('dotenv').config();
const { makeReply }     = require('./reply');


// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;
let chatId;
const keyboard = makeReply(['Option 1', 'Option 2', 'Option 3']);

if (token) {
    // Create a bot that uses 'polling' to fetch new updates
    // const bot = new TelegramBot(token, {polling: true});

    const bot = new TelegramBot(token, {polling: true});

    // console.log(bot.getToken());

    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on('message', (msg) => {

        let firstName;

        if (!chatId) {
            chatId = msg.chat.id;
        }

        bot.sendChatAction(chatId, 'typing');

        bot.getChat(chatId)
            .then((chat) => {
                firstName = chat.first_name;
                bot.sendMessage(
                    chatId, 
                    `Olá, ${firstName}.\nSeja bem-vindo ao nosso assitente virtual da nossa loja.\nAqui você poderá realizar seu pedido.`,
                    {
                        reply_markup: JSON.stringify({
                            keyboard: keyboard,
                            resize_keyboard: true,
                            one_time_keyboard: true
                        })
                    }
                );
            })
            .catch((error) => {
                firstName = '';
            });

        //bot.sendMessage(chatId, 'Received your message');

        // send a message to the chat acknowledging receipt of their message
        

    });

    bot.on("polling_error", console.log);

}