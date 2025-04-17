const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Creates a poll in the selected channel')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to post the poll in')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Title of the poll')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('question')
        .setDescription('What is the poll question?')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option_1')
        .setDescription('Poll option 1')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option_2')
        .setDescription('Poll option 2')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('set_time')
        .setDescription('Set the time limit (e.g., 10m, 2h, 1d)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option_3')
        .setDescription('Poll option 3')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('option_4')
        .setDescription('Poll option 4')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('option_5')
        .setDescription('Poll option 5')
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option.setName('allow_multiple_votes')
        .setDescription('Allow voting for multiple options?')
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option.setName('mention_everyone')
        .setDescription('Mention @everyone when posting the poll?')
        .setRequired(false)
    ),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const question = interaction.options.getString('question');
    const options = [
      interaction.options.getString('option_1'),
      interaction.options.getString('option_2'),
      interaction.options.getString('option_3'),
      interaction.options.getString('option_4'),
      interaction.options.getString('option_5')
    ].filter(Boolean);

    const allowMultipleVotes = interaction.options.getBoolean('allow_multiple_votes') || false;
    const mentionEveryone = interaction.options.getBoolean('mention_everyone') || false;
    const durationInput = interaction.options.getString('set_time');
    const durationMs = ms(durationInput);

    if (!durationMs || durationMs < 60000 || durationMs > ms('10d')) {
      return interaction.reply({ content: '⏱️ Invalid time. Use a time between 1 minute and 10 days (e.g., `10m`, `2h`, `1d`).', ephemeral: true });
    }

    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

    const embed = new EmbedBuilder()
      .setTitle(`📊 ${title}`)
      .setDescription(`**${question}**\n\n` +
        options.map((opt, i) => `${emojis[i]} ${opt}`).join('\n'))
      .setColor(0x00AE86)
      .setFooter({ text: `Poll created by ${interaction.user.tag}` })
      .setTimestamp();

    const pollMessage = await channel.send({
      content: mentionEveryone ? '@everyone' : '',
      embeds: [embed]
    });

    for (let i = 0; i < options.length; i++) {
      await pollMessage.react(emojis[i]);
    }

    interaction.reply({ content: `✅ Poll created in ${channel}`, ephemeral: true });

    if (!allowMultipleVotes) {
      const userVotes = new Map();
      const collector = pollMessage.createReactionCollector({ time: durationMs });

      collector.on('collect', async (reaction, user) => {
        if (user.bot) return;

        const existing = userVotes.get(user.id);
        if (existing && existing !== reaction.emoji.name) {
          const previousReaction = pollMessage.reactions.cache.find(r => r.emoji.name === existing);
          if (previousReaction) await previousReaction.users.remove(user.id);
        }
        userVotes.set(user.id, reaction.emoji.name);
      });
    }

    setTimeout(async () => {
      const fetched = await pollMessage.fetch();
      const results = new Map();

      for (let i = 0; i < options.length; i++) {
        const reaction = fetched.reactions.cache.get(emojis[i]);
        results.set(options[i], reaction ? reaction.count - 1 : 0);
      }

      const sorted = [...results.entries()].sort((a, b) => b[1] - a[1]);
      const resultEmbed = new EmbedBuilder()
        .setTitle(`📊 Poll Ended: ${title}`)
        .setDescription(
          sorted.map(([opt, count]) => `**${opt}** — ${count} vote(s)`).join('\n')
        )
        .setColor(0xED4245)
        .setTimestamp();

      await channel.send({ embeds: [resultEmbed] });
    }, durationMs);
  },
};
