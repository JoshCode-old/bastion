package nl.codefox.bastion;

import net.dv8tion.jda.core.AccountType;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.JDABuilder;
import nl.codefox.bastion.command.AboutCommand;
import nl.codefox.bastion.listener.CommandListener;
import nl.codefox.bastion.util.Logger;
import org.json.JSONObject;
import org.json.JSONTokener;

import javax.security.auth.login.LoginException;

public class Bastion {

	private static JDA JDA_INSTANCE;
	private static JSONObject config;
	private static CommandListener commandListener;
// TODO	private static ConnectionListener connectionListener;

	public static void main(String[] args) {
		Logger.info("Bastion starting up");
		JSONTokener tokener = new JSONTokener(Bastion.class.getResourceAsStream("/config/config.json"));
		config = new JSONObject(tokener);
		try {
			JDABuilder builder = new JDABuilder(AccountType.BOT);

			builder.setToken((String) config.get("token"));

			commandListener = new CommandListener()
					.registerCommand(new AboutCommand());

			builder.addEventListener(commandListener);

			JDA_INSTANCE = builder.buildBlocking();
		} catch (LoginException e) {

		} catch (InterruptedException e) {

		}
	}

	public static JDA getJDA() {
		return JDA_INSTANCE;
	}
}
