import {BotCommand} from "./BotCommand";
import {Message} from "discord.js";
import {EmbedResponse} from "../util/EmbedResponse";

export class AboutCommand extends BotCommand {
	commandName: string = "!about";
	minArguments: number = 0;
	maxArguments: number = 0;

	public handle(msg: Message) {
		let embed = new EmbedResponse();

		embed.addField("Version", process.env.npm_package_version, false);
		embed.addField("Repository", "https://www.github.com/JoshCode/B4ST10N", false);

		embed.complete(true);
		msg.channel.send(embed);
	}
}