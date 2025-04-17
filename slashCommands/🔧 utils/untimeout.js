
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('Remove timeout from a user')
    .addUserOption(option =>
      option.setName('user').setDescription('User to untimeout').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for untimeout').setRequired(false)),
  permissions: [PermissionFlagsBits.ModerateMembers],

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const moderator = interaction.user.tag;
    const serverName = interaction.guild.name;

    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('🔓 Timeout Removed')
      .addFields(
        { name: '**Server**', value: `${serverName}`, inline: false },
        { name: '**Moderator**', value: `${moderator}`, inline: false },
        { name: '**Reason**', value: `${reason}`, inline: false },
      )
      .setFooter({ text: 'You now have full access to the server again.' });

    try {
      await user.send({ embeds: [embed] });
    } catch {}

    await member.timeout(null, reason);
    await interaction.reply({ content: `✅ Timeout removed from ${user.tag}.`, ephemeral: true });
  },
};
