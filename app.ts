import "https://deno.land/x/dotenv/load.ts";
import {
    BotCommand,
  Message,
  TelegramBot,
  UpdateType,
} from "https://deno.land/x/telegram_bot_api/mod.ts";
import messages from "./messages.ts";

const TOKEN: string = <string> Deno.env.get("BOT_TOKEN");
const bot = new TelegramBot(TOKEN);


bot.on(UpdateType.Message, async ({ message }) => {
    if (isStart(message)) {
        const username = message.chat.first_name;
        const variables = new Map([['username', username]]);
        await bot.sendMessage({
            chat_id: message.chat.id,
            text: buildText(messages.welcome, variables),
        });
        await bot.setMyCommands({
            commands: [
                {
                    command: 'see_menu',
                    description: 'Mostra o cardápio para o usuário.'
                },
                {
                    command: 'place_order',
                    description: 'Inicia o pedido do usuário'
                }
            ]
        });
    } else {
        const expectedCommands =  await bot.getMyCommands();
    }
});

bot.run({ polling: true });

function isStart(msg: Message): boolean {
  let text: string = <string> msg.text;

  if (text === "/start") return true;

  return false;
}

function isExpectedCommand(msg: Message, commands: BotCommand[]): boolean {
    commands.forEach(({command, description}) => {
        if (msg.text === description) {
            return true;
        }
    });
    return false;
}

/**
 * 
 * @param {string} template - The message template template string. 
 * @param {Map<string, any>} variables - The Map containing all variables (key) that should be replaced with its resprctive values on the template.
 * 
 */
function buildText(template: string, variables: Map<string, any>): string {
    let output: string = template;
    for (const [key, value] of variables) {
        output = output.replaceAll(`%{${key}}%`, <string> value);
    }
    return output;
}
