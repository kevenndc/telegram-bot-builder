import { BotCommand } from "https://deno.land/x/telegram_bot_api@0.4.0/src/types/common/objects.ts";

export default class BotActionCommand implements BotCommand {
    command: string;
    description: string;

    constructor(command: string, description: string) {
        this.command = command;
        this.description = description;
    }

}