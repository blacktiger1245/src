
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user by ID.')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('User ID to unban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for unbanning')
        .setRequired(false)),
  permissions: [PermissionFlagsBits.BanMembers],

  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const moderator = interaction.user.tag;
    const serverName = interaction.guild.name;

    try {
      const user = await interaction.client.users.fetch(userId);
      await interaction.guild.members.unban(userId, reason);

      const embed = new EmbedBuilder()
        .setColor(0x57F287) // green color for unban
        .setTitle('✅ You have been unbanned')
        .addFields(
          { name: '**Server**', value: `${serverName}`, inline: false },
          { name: '**Moderator**', value: `${moderator}`, inline: false },
          { name: '**Reason**', value: `${reason}`, inline: false },
        )
        .setFooter({ text: 'You are welcome to rejoin the server if you wish.' });

      try {
        await user.send({ embeds: [embed] });
      } catch {}

      await interaction.reply({ content: `✅ Unbanned ${user.tag}`, ephemeral: true });
    } catch (err) {
      await interaction.reply({ content: `❌ Could not unban user.`, ephemeral: true });
    }
  },
};
