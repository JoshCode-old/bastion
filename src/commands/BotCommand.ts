import {Message} from "discord.js";

abstract class BotCommand {
	abstract commandName: string;

	abstract handle(msg: Message);

	public runCommand(msg: Message) {
		this.handle(msg);
	}

}

export {BotCommand};