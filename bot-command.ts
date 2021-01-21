import { BotCommand } from "https://deno.land/x/telegram_bot_api@0.4.0/src/types/common/objects.ts";

/**
 * @class The BotAction class implements the BotCommand interface and stores all data needed for a command action. 
 * 
 * @property {command} - The command name
 * @property {description} - The command description.
 * @property {bot_action} - The main bot action. This property stores the bot function that should be called when the command is executed (like 'sendMessage', 'sendPhoto', 'sendAudio', etc.)
 * @property {chat_action} - The chat action (like 'typing') that the bot will send to the user when the command is activated.
 * @property {static_params} - This Object stores all parameters that doesn't need dynamic data (like 'chat_id') for this BotAction to execute
 */
export default class BotAction implements BotCommand {
  command: string;
  description: string;
  bot_action: Function;
  chat_action?: string;
  static_params: Object;

  constructor(
    command: string,
    description: string,
    bot_action: Function,
    static_params: Object,
    chat_action: string = "",
  ) {
    this.command = command;
    this.description = description;
    this.bot_action = bot_action;
    this.static_params = static_params;
    this.chat_action = chat_action;
  }

  execute(params: any): Function {
    return this.bot_action(params);
  }
}
