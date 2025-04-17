const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  EmbedBuilder,
  PermissionsBitField,
  UserFlagsBitField,
  ChannelType
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Shows detailed info about a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get information about')
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    await user.fetch(); // To get banner

    // General Info
    const username = user.username;
    const userId = user.id;
    const nickname = member?.nickname || 'None';
    const isBot = user.bot ? 'Yes' : 'No';
    const badges = user.flags?.toArray().map(flag => formatBadge(flag)).join(', ') || 'None';
    const createdAt = `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`;
    const joinedAt = member?.joinedTimestamp
      ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`
      : 'Not in server';

    // Role Info
    const roles = member?.roles.cache
      .filter(role => role.id !== interaction.guild.id)
      .sort((a, b) => b.position - a.position);
    const roleList = roles?.map(r => r.toString()).join(', ') || 'None';
    const highestRole = roles?.first() || 'None';
    const roleCount = roles?.size || 0;

    // Extra Info
    const boosting = member?.premiumSince ? 'Yes' : 'No';
    const voiceTime = '0 hours, 0 minutes'; // Replace with tracking logic if needed

    // Permissions (excluding @everyone)
    let effectivePermissions = 0n;
    if (member) {
      const nonEveryoneRoles = member.roles.cache.filter(role => role.id !== interaction.guild.id);
      for (const role of nonEveryoneRoles.values()) {
        effectivePermissions |= role.permissions.bitfield;
      }

      const permissionNames = new PermissionsBitField(effectivePermissions).toArray();
      var permissions = permissionNames.length ? permissionNames.join(', ') : 'None';
    } else {
      var permissions = 'None';
    }

    // Avatar & Banner
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
    const banner = user.bannerURL({ dynamic: true, size: 1024 }) || 'No banner';

    const embed = new EmbedBuilder()
      .setTitle(`User Info: ${username}`)
      .setColor(0x00AE86)
      .setThumbnail(avatar)
      .setImage(banner !== 'No banner' ? banner : null)
      .addFields(
        {
          name: '**General Information**',
          value:
            `**Name:** ${username}\n` +
            `**ID:** ${userId}\n` +
            `**Nickname:** ${nickname}\n` +
            `**Bot?:** ${isBot}\n` +
            `**Badges:** ${badges}\n` +
            `**Account Created:** ${createdAt}\n` +
            `**Server Joined:** ${joinedAt}`,
          inline: false
        },
        {
          name: '**Role Information**',
          value:
            `**Highest Role:** ${highestRole}\n` +
            `**Roles (${roleCount}):** ${roleList}`,
          inline: false
        },
        {
          name: '**Extra**',
          value:
            `**Boosting:** ${boosting}\n` +
            `**Voice:** ${voiceTime}`,
          inline: false
        },
        {
          name: '**Key Permissions**',
          value: `\`${permissions}\``,
          inline: false
        },
        {
          name: '**Acknowledgement**',
          value: 'Server Member',
          inline: false
        }
      )
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL()
      });

    await interaction.reply({ embeds: [embed] });
  },
};

// Optional: Format badges
function formatBadge(flag) {
  const flags = {
    Staff: '🛡️ Discord Staff',
    Partner: '🤝 Partnered Server Owner',
    HypeSquad: '🎉 HypeSquad Events',
    BugHunterLevel1: '🐛 Bug Hunter',
    HypeSquadOnlineHouse1: '🏠 Bravery',
    HypeSquadOnlineHouse2: '🏠 Brilliance',
    HypeSquadOnlineHouse3: '🏠 Balance',
    PremiumEarlySupporter: '💎 Early Supporter',
    BugHunterLevel2: '🐞 Bug Hunter Level 2',
    VerifiedBot: '🤖 Verified Bot',
    VerifiedDeveloper: '👨‍💻 Early Verified Bot Developer',
    ActiveDeveloper: '👨‍💻 Active Developer'
  };
  return flags[flag] || flag;
}

