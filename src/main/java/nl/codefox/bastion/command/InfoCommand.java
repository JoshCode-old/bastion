package nl.codefox.bastion.command;

import net.dv8tion.jda.core.MessageBuilder;
import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import nl.codefox.bastion.Bastion;
import nl.codefox.bastion.util.BotEmbedBuilder;
import nl.codefox.bastion.util.Logger;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Collections;
import java.util.List;

/**
 * @author Joshua Slik
 */
public class InfoCommand extends BotCommand {

	@Override
	public List<String> getAliases() {
		return Collections.singletonList("!info");
	}

	@Override
	public String getDescription() {
		return "Command to get info about a certain Overwatch profile";
	}

	@Override
	public void process(String command, String[] args, TextChannel channel, User author, MessageReceivedEvent event) {
		BotEmbedBuilder eb = new BotEmbedBuilder();

		String username = event.getMember().getEffectiveName().replace("#", "-");
		try {
			URL url = new URL(String.format("https://owapi.net/api/v3/u/%s/stats", username));
			Logger.debug("URL: " + url);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("User-Agent", String.format("nl.codefox.bastion v%s", Bastion.getVersion()));

			int status = conn.getResponseCode();
			Logger.debug("Resp Code: " + status);

			try {
				conn.getInputStream();
			} catch (Exception ex) {
				ex.printStackTrace();
			}

			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String inputLine;
			StringBuffer content = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				content.append(inputLine);
			}
			in.close();

			Logger.debug("Response:\n" + content);

			JSONObject response = new JSONObject(content);
			Logger.debug(response.get("_request.api_ver").toString());
		} catch (IOException e) {
			e.printStackTrace();
		}

		MessageBuilder mb = new MessageBuilder();
		mb.setEmbed(eb.build());
		mb.append(String.format("[%s]", author.getAsMention()));
		channel.sendMessage(mb.build()).queue();
	}
}
