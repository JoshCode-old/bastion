import {Message} from "discord.js";

abstract class BotCommand {
	/**
	 * The name for the command, e.g. "!mycommand"
	 */
	abstract commandName: string;

	/**
	 * The minimum number of arguments for the command
	 * Set to -1 for no minimum number of arguments
	 */
	abstract minArguments: number;

	/**
	 * The maximum number of arguments for the command
	 * Set to -1 for no maximum number of arguments
	 */
	abstract maxArguments: number;

	abstract handle(msg: Message);

	public runCommand(msg: Message) {
		this.handle(msg);
	}

}

export {BotCommand};