import { TelegramBot } from "https://deno.land/x/telegram_bot_api/mod.ts";
import { BotCommand } from "https://deno.land/x/telegram_bot_api@0.4.0/src/types/common/objects.ts";
import BotAction from "./bot-command.ts";

export default class Bot extends TelegramBot {
  private actions: Map<string, BotAction>; 

  constructor(token: string) {
    super(token);
    this.actions = new Map();
  }

  /**
   * This function (not to be confused with 'setMyCommands') is responsible for 
   * creating and setting all bot commands as BotAction's
   * 
   * @param commands
   */
  async setCommands(
    commands: Array<{
      command: string,
      description: string,
      bot_action: string,
      static_params: Object,
      chat_action?: string
    }>,
  ) {
    let botCommands: BotCommand[] = await this.getMyCommands();

    commands.forEach(cmd => {
      try {
        /**
         * Uses the 'bot_action' string as key to get the correct action that the bot should
         * execute when when the current command is executed.
         */
        const botAction = this[cmd.bot_action as keyof Bot];

        const newAction= new BotAction(
          cmd.command,
          cmd.description,
          botAction,
          cmd.static_params,
          cmd.chat_action
        );

        /**
         * Stores the command name and description as keys for the same BotAction. This way a BotAction can be executed either if the user types the command name or the command description (common with the use of KeyboardMarkup's)
         */
        this.actions.set(cmd.command, newAction)
                    .set(cmd.description, newAction);

        botCommands.push(newAction);

      } catch (error) {
        throw new Error(`Error = ${error}`);
      }
    });

    await this.setMyCommands({ commands: botCommands });
  }

  async execute(chatId: number, text: string) {
    const command = text.startsWith('/') ? text.substring(1) : text;
    console.log(command);
    const action = await this.actions.get(command);
    //console.log(action);
    if (action) {
      const params = Object.assign({ chat_id: chatId }, action.static_params);
      //if (action.chat_action !== "")
      await action.execute(params);
    }
  }

  public get botCommands(): any {
    return this.actions;
  }
}
