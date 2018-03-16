import {BotCommand} from "./BotCommand";
import {Message} from "discord.js";
import {ResponseEmbed} from "../util/ResponseEmbed";
import {OWAPI} from "../util/owapi/owapi";
import {RequestError, StatusCodeError} from "request-promise-native/errors";
import {UserData} from "../models/UserData";

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
		if (args.length !== 1) {
			console.log("!info command without arguments");
			UserData.findOne({userID: msg.author.id}, (err, doc) => {
				if (err) {
					console.log(err);
					response.setDescription("Unexpected error");
					response.complete(false);
					Promise.all(promises).then(() => {
						sentMessage.edit(response);
					});
					return;
				} else if (doc === null) {
					response.setDescription("You are not registered, please execute `!register <battletag>` first");
					response.complete(false);

					Promise.all(promises).then(() => {
						sentMessage.edit(response);
					});
				} else {
					const username = doc.battletag;

					promises.push(this.constructResponse(username).then((res) => {
						response = res;
					}));

					Promise.all(promises).then(() => {
						sentMessage.edit(response);
					});
				}
			});
		} else {
			const username = args[0];

			promises.push(this.constructResponse(username).then((res) => {
				response = res;
			}));

			Promise.all(promises).then(() => {
				sentMessage.edit(response);
			})
		}
	}

	private constructResponse(username: String): Promise<ResponseEmbed> {
		let result = new Promise<ResponseEmbed>((resolve, reject) => {
			username = username.replace("#", "-");
			let response = new ResponseEmbed();
			OWAPI.requestStats(username).then((json) => {
				response.setDescription("");
				response.addField("Username", `${username.substr(0, username.length - 5)}`, false);
				response.addField("Tier", `${json.eu.stats.competitive.overall_stats.tier}`, true);
				response.addField("Rank", `${json.eu.stats.competitive.overall_stats.comprank}`, true);
				response.complete(true);
				resolve(response);
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
				resolve(response);
			});
		});
		return result;
	}

}