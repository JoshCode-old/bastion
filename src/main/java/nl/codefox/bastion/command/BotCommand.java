package nl.codefox.bastion.command;

import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import nl.codefox.bastion.util.Logger;

import java.util.List;

/**
 * @author Joshua Slik
 */
public abstract class BotCommand {

	public BotCommand() {
		Logger.debug("Initialised command '" + getAliases().get(0) + "'");
	}

	public String getUsage() {
		if (getAliases().size() > 1)
			return String.format("Usage ![%s]", getAliases());
		else
			return String.format("Usage !%s", getAliases().get(0)).replace("!!", "!");
	}

	public abstract List<String> getAliases();

	public abstract String getDescription();

	public final void runCommand(String command, String[] args, TextChannel channel, User author, MessageReceivedEvent event) {
		process(command, args, channel, author, event);
	}

	public abstract void process(String command, String[] args, TextChannel channel, User author, MessageReceivedEvent event);

}
