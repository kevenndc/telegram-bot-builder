import {
  TelegramBot,
} from "https://deno.land/x/telegram_bot_api/mod.ts";

export default class Bot extends TelegramBot {
    private token: string;

    constructor(token: string) {
        super(token);
        this.token = token;
        this['sendMessage']
    }

    test() {
        const obj = Object.create(this['sendMessage']);
        const func = this['sendMessage'];
        type t =  ThisType<typeof func>;
        //console.log(t)
    }

    setCommands(
        commandParameters: {
            command_name: string, 
            sendType: string,
        }[]
     ) {

    }
}