const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Show bot statistics'),

  async execute(interaction) {
    const client = interaction.client;

    const totalGuilds = client.guilds.cache.size;
    const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount || 0), 0);
    const ping = client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor('#00BFFF') // Light Blue
      .setTitle('| Bot Stats')
      .addFields(
        { name: 'Bot Name', value: client.user.username, inline: true },
        { name: 'Commands', value: `12`, inline: true }, // Fixed value here
        { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Users', value: `${totalUsers}`, inline: true },
        { name: 'Ping', value: `${ping}ms`, inline: true },
        { name: 'Developer', value: '[**Black Tiger**](https://discord.com/users/1285615841773092941)', inline: true },
        { name: 'Owner', value: '[**Black Tiger**](https://discord.com/users/1285615841773092941)', inline: true },
      )
      .setFooter({ text: 'Som Helper BT', iconURL: client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  }
};