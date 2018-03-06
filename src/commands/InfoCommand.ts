import {BotCommand} from "./BotCommand";
import {Message} from "discord.js";
import {ResponseEmbed} from "../util/ResponseEmbed";
import {OWAPI} from "../util/owapi/owapi";
import {RequestError, StatusCodeError} from "request-promise-native/errors";

export class InfoCommand extends BotCommand {
	commandName: string = "!info";
	minArguments: number = 1;
	maxArguments: number = 1;

	handle(msg: Message) {
		let response = new ResponseEmbed();
		let sentMessage = null;
		response.setDescription("Your request is being processed");
		response.setColor("#0000FF");
		let promises = [];
		promises.push(msg.channel.send(response).then((message: Message) => {
			sentMessage = message;
		}));

		let args: string[] = msg.content.split(" ");
		args.splice(0, 1);
		const username = args[0].replace("#", "-");

		promises.push(OWAPI.requestStats(username).then((json) => {
			response.setDescription("");
			response.addField("Username", `${username.substr(0, username.length - 5)}`, false);
			response.addField("Tier", `${json.eu.stats.competitive.overall_stats.tier}`, true);
			response.addField("Rank", `${json.eu.stats.competitive.overall_stats.comprank}`, true);
			response.complete(true);
		}).catch((err: Error) => {
			console.log(err);
			if (err instanceof RequestError) {
				response.setDescription("Unexpected error handling your request");
			} else if (err instanceof StatusCodeError) {
				let response = JSON.parse(err.error);
				if (response.msg === "profile not found") {
					response.setDescription("This user was not found");
				} else {
					response.setDescription("Unexpected error handling your request");
				}
			}
			response.complete(false);
		}));

		Promise.all(promises).then(() => {
			sentMessage.edit(response);
		})
	}

}