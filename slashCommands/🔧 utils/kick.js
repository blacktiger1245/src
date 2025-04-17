const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server.')
    .addUserOption(option =>
      option.setName('user').setDescription('User to kick').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for the kick').setRequired(false)),
  permissions: [PermissionFlagsBits.KickMembers],

  async execute({ interaction }) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const moderator = interaction.user.tag;
    const serverName = interaction.guild.name;

    const embed = new EmbedBuilder()
      .setColor(0xFFA500) // orange color for kick
      .setTitle('⚠️ You have been kicked')
      .addFields(
        { name: '**Server**', value: `${serverName}`, inline: false },
        { name: '**Moderator**', value: `${moderator}`, inline: false },
        { name: '**Reason**', value: `${reason}`, inline: false },
      )
      .setFooter({ text: 'Contact the moderator if you believe this was a mistake.' });

    try {
      await user.send({ embeds: [embed] });
    } catch {}

    await member.kick(reason);
    await interaction.reply({ content: `✅ ${user.tag} has been kicked.`, ephemeral: true });
  },
};
