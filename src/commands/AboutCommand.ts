import {BotCommand} from "./BotCommand";
import {Message} from "discord.js";
import {ResponseEmbed} from "../util/ResponseEmbed";
import {version} from "../app";

export class AboutCommand extends BotCommand {
	commandName: string = "!about";
	minArguments: number = 0;
	maxArguments: number = 0;

	public handle(msg: Message) {
		let response = new ResponseEmbed();

		response.addField("Version", version, false);
		response.addField("Repository", "https://www.github.com/JoshCode/B4ST10N", false);

		response.complete(true);
		msg.channel.send(response);
	}
}