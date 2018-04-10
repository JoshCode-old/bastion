package nl.codefox.bastion;

import net.dv8tion.jda.core.AccountType;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.JDABuilder;
import nl.codefox.bastion.util.Logger;
import org.json.JSONObject;
import org.json.JSONTokener;

import javax.security.auth.login.LoginException;

public class Bastion {

	public static JSONObject config;

	public static void main(String[] args) {
		Logger.info("Bastion starting up");
		JSONTokener tokener = new JSONTokener(Bastion.class.getResourceAsStream("/config/config.json"));
		config = new JSONObject(tokener);
		try {
			JDA jda = new JDABuilder(AccountType.BOT).setToken((String) config.get("token")).buildBlocking();
		} catch (LoginException e) {

		} catch (InterruptedException e) {

		}
	}

}
