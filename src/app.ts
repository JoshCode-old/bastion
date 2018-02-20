import * as fs from "fs";
import * as Discord from "discord.js";
const client = new Discord.Client();

let config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

let enabledGuilds : string[] = [];
if(config.debug.enabled)
	enabledGuilds.push(config.debug.debugServer);
else
	enabledGuilds.push(config.productionServer);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (enabledGuilds.includes(msg.guild.id)) {
		if (msg.content === 'ping') {
			msg.reply('pong');
		}
	}
});

client.login(config.token);
