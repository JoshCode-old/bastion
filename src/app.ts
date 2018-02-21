import * as fs from "fs";
import * as Discord from "discord.js";
import {Collection, Role, Snowflake} from "discord.js";
import {BotCommand} from "./commands/BotCommand";
import {AboutCommand} from "./commands/AboutCommand";
import {ResponseEmbed} from "./util/ResponseEmbed";
import {InfoCommand} from "./commands/InfoCommand";

const client = new Discord.Client();

let config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

let enabledChannels: string[] = [];
let enabledCommands: BotCommand[] = [];

if (config.debug.enabled)
	enabledChannels.push(config.debug.debugChannel);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

enabledCommands.push(new AboutCommand());
enabledCommands.push(new InfoCommand());

client.on('message', (msg) => {
	/**
	 * Debug commands
	 */
	if (config.debug.enabled) {
		if (msg.content == '!enable') {
			if (msg.guild.roles.find("name", "Moderator").members.has(msg.author.id)) {
				if (enabledChannels.indexOf(msg.channel.id) > -1) {
					let response = new ResponseEmbed();
					response.setDescription("Bot was already enabled on this channel");
					response.complete(false);
					msg.channel.send(response);
				} else {
					let response = new ResponseEmbed();
					enabledChannels.push(msg.channel.id);
					response.setDescription("Bot temporarily enabed on this channel in debug mode");
					response.complete(true);
					msg.channel.send(response);
				}
			} else {
				let response = new ResponseEmbed();
				response.setDescription("You are not authorized to execute this command");
				response.complete(false);
				msg.channel.send(response);
			}
		}
		if (enabledChannels.includes(msg.channel.id)) {
			if (msg.content == '!disable') {
				if (msg.guild.roles.find("name", "Moderator").members.has(msg.author.id)) {
					let response = new ResponseEmbed();

					let index = enabledChannels.indexOf(msg.channel.id);
					if (index > -1) {
						enabledChannels.splice(index, 1);
					}

					response.setDescription("Bot disabled on this channel");
					response.complete(true);
					msg.channel.send(response);
				} else {
					let response = new ResponseEmbed();
					response.setDescription("You are not authorized to execute this command");
					response.complete(false);
					msg.channel.send(response);
				}
			}
		}
	}

	/**
	 * Enabled commands
	 */
	if (enabledChannels.includes(msg.channel.id) || config.debug.enabled === false) {
		for (let i = 0; i < enabledCommands.length; i++) {
			if (msg.content.startsWith(enabledCommands[i].commandName))
				enabledCommands[i].runCommand(msg);
		}
	}
});

client.login(config.token);
