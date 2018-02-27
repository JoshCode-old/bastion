import {BotCommand} from "./BotCommand";
import {Message} from "discord.js";
import {UserData} from "../models/UserData";
import {ResponseEmbed} from "../util/ResponseEmbed";

export class RegisterCommand extends BotCommand {
	commandName: string = "!register";
	minArguments: number;
	maxArguments: number;

	handle(msg: Message) {
		let response = new ResponseEmbed();
		let args = msg.content.split(" ");
		args.splice(0, 1);

		let user = new UserData({
			userID: msg.author.id,
			registeredOn: Date.now(),
			battletag: args[0]
		});

		user.save().then(doc => {
			response.setDescription(`Successfully registered user '**${args[0]}**'`);
			response.complete(true);
			msg.channel.send(response);
		}).catch((err) => {
			if(err.code && err.code === 11000) {
				response.setDescription(`Battletag '**${args[0]}**' is already registered`);
			} else {
				response.setDescription(`Unexpected error registering user '**${args[0]}**'`);
			}
			response.complete(false);
			msg.channel.send(response);
		});
	}

}