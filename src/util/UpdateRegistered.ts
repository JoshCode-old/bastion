import * as schedule from "node-schedule";
import {UserData} from "../models/UserData";
import {UpdateCommand} from "../commands/UpdateCommand";
import {client} from "../app";

export class UpdateRegistered {

	public static setSchedule() {
		schedule.scheduleJob('0 0 * * *', UpdateRegistered.updateRegisteredUsers); // run everyday at midnight
		this.updateRegisteredUsers();
		// schedule.scheduleJob('*/1 * * * *', UpdateRegistered.updateRegisteredUsers); // run everyday every minute
	}

	private static async updateRegisteredUsers() {
		console.log("Updating all registered users");
		let users = null;
		await UserData.find().then((docs) => {
			users = docs;
		});
		console.log(users);
		for (let i = 0; i < users.length; i++) {
			let user = users[i];
			new UpdateCommand(client.guilds.find("id", "406877268556644363")).updateUser(user.battletag, user.userID);
		}
	}

}