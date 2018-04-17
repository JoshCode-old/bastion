package nl.codefox.bastion.listener;

import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;
import nl.codefox.bastion.Bastion;
import nl.codefox.bastion.command.BotCommand;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * @author Joshua Slik
 */
public class CommandListener extends ListenerAdapter {

	private List<BotCommand> commands;

	public CommandListener() {
		commands = new ArrayList<>();
	}

	public CommandListener registerCommand(BotCommand command) {
		commands.add(command);
		return this;
	}

	public List<BotCommand> getCommands() {
		return commands;
	}

	@Override
	public void onMessageReceived(MessageReceivedEvent event) {
		User author = event.getAuthor();
		String message = event.getMessage().getContentRaw();

		if (!message.startsWith("!")) {
			return;
		}

		if (author != Bastion.getJDA().getSelfUser()) {
			String[] args = message.split(" ");
			String command = args[0];
			String[] finalArgs = Arrays.copyOfRange(args, 1, args.length);
			TextChannel channel = event.getTextChannel();
			Optional<BotCommand> c = commands.stream().filter(cc -> cc.getAliases().contains(command)).findFirst();

			if (c.isPresent()) {
				BotCommand cc = c.get();

				new Thread() {
					@Override
					public void run() {
						cc.runCommand(command, finalArgs, channel, author, event);
						interrupt();
					}
				}.start();
			}
		}
	}

}
