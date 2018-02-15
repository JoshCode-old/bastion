import * as fs from "fs";
import * as Discord from "discord.js";
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}
});

let config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
client.login(config.token);
