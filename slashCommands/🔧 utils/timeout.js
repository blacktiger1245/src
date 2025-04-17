
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a user')
    .addUserOption(option =>
      option.setName('user').setDescription('User to timeout').setRequired(true))
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('Timeout duration')
        .setRequired(true)
        .addChoices(
          { name: '5 minutes', value: '5m' },
          { name: '10 minutes', value: '10m' },
          { name: '1 hour', value: '1h' },
          { name: '5 hours', value: '5h' },
          { name: '1 day', value: '1d' },
          { name: '10 days', value: '10d' }
        ))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for timeout').setRequired(false)),
  permissions: [PermissionFlagsBits.ModerateMembers],

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const msDuration = ms(duration);
    const moderator = interaction.user.tag;
    const serverName = interaction.guild.name;

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('⏳ You have been timed out')
      .addFields(
        { name: '**Server**', value: `${serverName}`, inline: false },
        { name: '**Moderator**', value: `${moderator}`, inline: false },
        { name: '**Duration**', value: `${duration}`, inline: false },
        { name: '**Reason**', value: `${reason}`, inline: false },
      )
      .setFooter({ text: 'You will regain access after the timeout period ends.' });

    try {
      await user.send({ embeds: [embed] });
    } catch (err) {
      console.log(`Couldn't DM ${user.tag}`);
    }

    await member.timeout(msDuration, reason);
    await interaction.reply({ content: `✅ ${user.tag} has been timed out.`, ephemeral: true });
  },
};
