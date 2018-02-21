import {BotCommand} from "./BotCommand";
import {Message} from "discord.js";
import {ResponseEmbed} from "../util/ResponseEmbed";
import * as https from "https";
import {IncomingMessage} from "http";

export class InfoCommand extends BotCommand {
	commandName: string = "!info";
	minArguments: number = 1;
	maxArguments: number = 1;

	handle(msg: Message) {
		let response = new ResponseEmbed();
		let args: string[] = msg.content.split(" ");
		args.splice(0, 1);

		const username = args[0].replace("#", "-");
		const options = {
			hostname: 'owapi.net',
			path: `/api/v3/u/${username}/stats`,
			method: 'GET',
			headers: {
				'User-Agent': `nl.codefox.bastion ${process.env.npm_package_version}`
			}
		};

		const req = https.request(options, (res: IncomingMessage) => {
			console.log(`${res.statusCode} ${res.statusMessage}`);
			res.setEncoding('utf8');
			let responseString: string = "";
			res.on('data', (chunk) => {
				responseString += chunk;
			});
			res.on('end', () => {
				let responseJson = JSON.parse(responseString);
				if (res.statusCode === 200) {
					response.addField("Username", `${username.substr(0, username.length - 5)}`, false);
					response.addField("Tier", `${responseJson.eu.stats.competitive.overall_stats.tier}`, true);
					response.addField("Rank", `${responseJson.eu.stats.competitive.overall_stats.comprank}`, true);
					response.complete(true);
					msg.channel.send(response);
				} else {
					if (responseJson.msg === "profile not found") {
						response.setDescription("This user was not found");
					} else {
						response.setDescription("Unexpected error handling your request");
					}
					response.complete(false);
					msg.channel.send(response);
				}
			})
		});

		req.on('error', () => {
			console.log("Error submitting API request")
		});
		req.end();
	}

}