const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server.')
    .addUserOption(option =>
      option.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('Ban duration')
        .setRequired(true)
        .addChoices(
          { name: '1 day', value: '1 day' },
          { name: '5 days', value: '5 days' },
          { name: '10 days', value: '10 days' },
          { name: '30 days', value: '30 days' },
          { name: 'Forever', value: 'Forever' },
        ))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason for the ban').setRequired(false)),
  permissions: [PermissionFlagsBits.BanMembers],

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const moderator = interaction.user.tag;
    const serverName = interaction.guild.name;

    const embed = new EmbedBuilder()
      .setColor(0xFF0000) // red color
      .setTitle('🚫 You have been banned')
      .addFields(
        { name: '**Server**', value: `${serverName}`, inline: false },
        { name: '**Moderator**', value: `${moderator}`, inline: false },
        { name: '**Duration**', value: `${duration}`, inline: false },
        { name: '**Reason**', value: `${reason}`, inline: false },
      )
      .setFooter({ text: 'Contact the moderator if you believe this was a mistake.' });

    try {
      await user.send({ embeds: [embed] });
    } catch (err) {
      console.log(`Could not send DM to ${user.tag}.`);
    }

    if (member) {
      await member.ban({ reason });
      await interaction.reply({ content: `✅ ${user.tag} has been banned.`, ephemeral: true });
    } else {
      await interaction.reply({ content: `❌ Could not ban ${user.tag}. They may have left the server.`, ephemeral: true });
    }
  },
};
