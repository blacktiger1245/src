
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option =>
      option.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for the warning').setRequired(false)),
  permissions: [PermissionFlagsBits.ModerateMembers],

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const moderator = interaction.user.tag;
    const serverName = interaction.guild.name;

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle('⚠️ You have received a warning')
      .addFields(
        { name: '**Server**', value: `${serverName}`, inline: false },
        { name: '**Moderator**', value: `${moderator}`, inline: false },
        { name: '**Reason**', value: `${reason}`, inline: false },
      )
      .setFooter({ text: 'Please follow the server rules to avoid further action.' });

    try {
      await user.send({ embeds: [embed] });
    } catch {}

    await interaction.reply({ content: `✅ ${user.tag} has been warned.`, ephemeral: true });
  },
};
