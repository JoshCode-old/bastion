import * as request from "request-promise-native";
import {version} from "../../app";

export class OWAPI {

	private static url: string = "https://owapi.net";
	private static userAgent: string = `nl.codefox.bastion v${version}`;

	public static requestStats(username: String): Promise<OWAPIResponseStats> {
		return this.request(`/api/v3/u/${encodeURIComponent(username.toString())}/stats`);
	}

	private static request(endpoint: string): Promise<OWAPIResponseStats> {
		const options = {
			url: this.url + endpoint,
			headers: {
				'User-Agent': this.userAgent
			}
		};

		return new Promise<OWAPIResponseStats>((resolve, reject) => {
			request(options).then((res) => {
				resolve(JSON.parse(res));
			}).catch((err) => {
				reject(err);
			})
		});
	}

	public static requestStatsProfiling(username: string): Promise<OWAPIResponseStats> {
		let start = Date.now();
		let promise = this.requestStats(username);
		promise.then(() => {
			let end = Date.now();
			console.log(`Execution took ${end-start} ms`)
		}).catch(() => {
			console.log("Rejected")
		});
		return promise;
	}

}