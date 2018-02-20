import {BotCommand} from "./BotCommand";
import {Message, RichEmbed} from "discord.js";

export class AboutCommand extends BotCommand {
	commandName: string = "!about";

	public handle(msg : Message) {
		let embed = new RichEmbed();

		msg.channel.send(embed);
	}
}