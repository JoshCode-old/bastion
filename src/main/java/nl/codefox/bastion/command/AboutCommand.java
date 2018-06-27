package nl.codefox.bastion.command;

import net.dv8tion.jda.core.EmbedBuilder;
import net.dv8tion.jda.core.MessageBuilder;
import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import nl.codefox.bastion.Bastion;
import nl.codefox.bastion.util.BotEmbedBuilder;

import java.util.Collections;
import java.util.List;

/**
 * @author Joshua Slik
 */
public class AboutCommand extends BotCommand {

	@Override
	public List<String> getAliases() {
		return Collections.singletonList("!about");
	}

	@Override
	public String getDescription() {
		return "Shows information about this bot";
	}

	@Override
	public void process(String command, String[] args, TextChannel channel, User author, MessageReceivedEvent event) {
		BotEmbedBuilder eb = new BotEmbedBuilder();

		// TODO Dynamic version
		eb.addField("Version", Bastion.getVersion(), false);
		eb.addField("GitHub", "https://github.com/joshcode/B4ST10N", false);

		MessageBuilder mb = new MessageBuilder();
		mb.setEmbed(eb.build());
		mb.append(String.format("[%s]", author.getAsMention()));
		channel.sendMessage(mb.build()).queue();
	}
}
