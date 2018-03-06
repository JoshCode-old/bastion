import {BotCommand} from "./BotCommand";
import {Message} from "discord.js";
import {ResponseEmbed} from "../util/ResponseEmbed";

export class EditCommand extends BotCommand {
	commandName: string = "!edit";
	maxArguments: number;
	minArguments: number;

	handle(msg: Message) {
		let response = new ResponseEmbed();
		response.setDescription("Your request is being processed");
		response.complete(false);
		response.setColor("#0000FF");

		let editMessage = function (message: Message) {
			response.setDescription("Your request is complete");
			response.complete(true);
			message.edit(response);
		};

		msg.channel.send(response).then((message: Message) => {
			setTimeout(() => {
				editMessage(message);
			}, 2000);
		});
	}
}