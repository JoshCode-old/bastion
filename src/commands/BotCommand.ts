import {Message} from "discord.js";

abstract class BotCommand {
	abstract commandName :string;

	abstract handle(msg : Message);
}

export {BotCommand};