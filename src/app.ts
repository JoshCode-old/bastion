import * as fs from "fs";
import * as Discord from "discord.js";
import {BotCommand} from "./commands/BotCommand";
import {AboutCommand} from "./commands/AboutCommand";

const client = new Discord.Client();

let config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

let enabledChannels: string[] = [];
let enabledCommands: BotCommand[] = [];

if (config.debug.enabled)
	enabledChannels.push(config.debug.debugChannel);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(config.debug.enabled) {
		if (msg.content == '!enable') {
			enabledChannels.push(msg.channel.id)
		}
		if (msg.content == '!disable') {
			let index = enabledChannels.indexOf(msg.channel.id);
			if(index > -1) {
				enabledChannels.splice(index, 1);
			}
		}
	}
	if (enabledChannels.includes(msg.channel.id) || config.debug.enabled === false) {
		for (let i = 0; i < enabledCommands.length; i++) {
			if (msg.content === enabledCommands[i].commandName)
				enabledCommands[i].handle(msg)
		}
		if (msg.content === 'ping') {
			msg.reply('pong');
		}
	}
});

client.login(config.token);
