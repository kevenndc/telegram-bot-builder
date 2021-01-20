import { TelegramBot } from "https://deno.land/x/telegram_bot_api/mod.ts";
import { BotCommand } from "https://deno.land/x/telegram_bot_api@0.4.0/src/types/common/objects.ts";
import BotActionCommand from "./bot-command.ts";

export default class Bot extends TelegramBot {
  private commands: Array<
    {
      command: BotCommand;
      command_function: Function;
      static_function_params: Object;
    }
  >;

  constructor(token: string) {
    super(token);
    this.commands = [];
  }

  async addCommands(
    commands: Array<{
      command_name: string;
      description: string;
      command_function: string;
      static_function_params: Object;
    }>,
  ) {
    let newCommands: BotCommand[] = await this.getMyCommands();
    commands.forEach((command) => {
      try {
        const commandFunction = this[command.command_function as keyof Bot];
        const newCommand = new BotActionCommand(
          command.command_name,
          command.description,
        );
        this.commands.push({
          command: newCommand,
          command_function: commandFunction,
          static_function_params: command.static_function_params,
        });
        newCommands.push(newCommand);
      } catch (error) {
        throw new Error(`Error = ${error}`);
      }
    });
    this.setMyCommands({ commands: newCommands });
  }

  async execute(chatId: number, command: string) {
    const commandObj = await this.getCommand(command);
    console.log(commandObj);
    if (commandObj) {
      const params = Object.assign({ chat_id: chatId }, commandObj.params);
      console.log(commandObj.function);
      await commandObj.function(params);
    }
  }

  getCommand(text: string): any {
    let output: Object = {};
    this.commands.forEach((cmd) => {
      console.log(`${cmd.command.description} === ${text}`);

      if (cmd.command.description === text) {
        console.log("entrou");
        output = Object.create({
          function: cmd.command_function,
          params: cmd.static_function_params,
        });
      }
    });

    return output;
  }

  public get botCommands(): any {
    return this.commands;
  }
}
