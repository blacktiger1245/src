const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get detailed information about the server'),

  async execute(interaction) {
    const server = interaction.guild;

    // Get server info
    const owner = await server.fetchOwner();
    const roles = server.roles.cache.map(role => role.name).join(', ') || 'No roles';
    const memberCount = server.memberCount;
    const boostCount = server.premiumSubscriptionCount;

    // Count specific channel types
    const categoryChannels = server.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size;
    const textChannels = server.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size;
    const voiceChannels = server.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size;

    // Server media
    const iconUrl = server.iconURL() || '';
    const bannerUrl = server.bannerURL() || '';

    // Creation timestamp for Discord formatting
    const createdTimestamp = Math.floor(server.createdTimestamp / 1000); // Convert ms to seconds

    // Embed
    const embed = new EmbedBuilder()
      .setTitle(`Server Info - ${server.name}`)
      .setColor(0x00AE86)
      .addFields(
        { name: 'Owner', value: owner.user.tag, inline: false },
        { name: 'Created On', value: `<t:${createdTimestamp}:F>`, inline: false },
        { name: 'Roles', value: roles, inline: false },
        { name: 'Members', value: `${memberCount}`, inline: false },
        { name: 'Category Channels', value: `${categoryChannels}`, inline: false },
        { name: 'Text Channels', value: `${textChannels}`, inline: false },
        { name: 'Voice Channels', value: `${voiceChannels}`, inline: false },
        { name: 'Boost Count', value: `${boostCount}`, inline: false },
        { name: 'Server Icon', value: iconUrl ? `[Link](${iconUrl})` : 'No icon', inline: false },
        { name: 'Server Banner', value: bannerUrl ? `[Link](${bannerUrl})` : 'No banner', inline: false }
      )
      .setThumbnail(iconUrl)
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};
