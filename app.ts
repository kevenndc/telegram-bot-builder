import "https://deno.land/x/dotenv/load.ts";
import {
  Message,
  UpdateType,
} from "https://deno.land/x/telegram_bot_api/mod.ts";
import messages from "./messages.ts";
import Bot from "./bot.ts";

const TOKEN: string = <string> Deno.env.get("BOT_TOKEN");
const bot = new Bot(TOKEN);

bot.on(UpdateType.Message, async ({ message }) => {
  const chatId: number = message.chat.id;
  const username = message.chat.first_name;
  const variables = new Map([["username", username]]);

  await bot.setCommands([
    {
      command: "see_menu",
      description: "Ver menu",
      bot_action: "sendMessage",
      static_params: {
        text: messages.see_menu,
      },
      chat_action: 'typing'
    },
  ]);

  if (isStart(message)) {
    await bot.sendMessage({
      chat_id: chatId,
      text: buildText(messages.welcome, variables),
    });

    console.log(bot.botCommands);
  } else {
    await bot.sendChatAction({
      action: "typing",
      chat_id: chatId,
    });
    console.log(bot.botCommands);
    await bot.execute(chatId, <string> message.text);
  }
});

bot.run({ polling: true });

function isStart(msg: Message): boolean {
  let text: string = <string> msg.text;

  if (text === "/start") return true;

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
