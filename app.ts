import "https://deno.land/x/dotenv/load.ts";
import {
  Message,
  TelegramBot,
  UpdateType,
} from "https://deno.land/x/telegram_bot_api/mod.ts";

import messages from "./messages.ts";

//const { messages } = messagesJSON;
const TOKEN: string = <string> Deno.env.get("BOT_TOKEN");
const bot = new TelegramBot(TOKEN);



bot.on(UpdateType.Message, async ({ message }) => {
    if (isStart(message)) {
        const username = message.chat.first_name;
        const variables = { username: username };
        await bot.sendMessage({
            chat_id: message.chat.id,
            text: buildText(messages.welcome, variables),
        });
    }
});

bot.run({ polling: true });

function isStart(msg: Message): boolean {
  let text: string = <string> msg.text;

  if (text === "/start") return true;

  return false;
}

function buildText(template: string, variables: Object): string {
    let output: string = template;
    for (const [key, value] of Object.entries(variables)) {
        output = output.replaceAll(`%{${key}}%`, <string> value);
    }
    return output;
}
