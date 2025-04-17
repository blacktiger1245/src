const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Displays information about the bot'),

  async execute(interaction) {
    const client = interaction.client;

    const embed = new EmbedBuilder()
      .setTitle('🤖 Bot Information')
      .setColor(0x00ffff)
      .addFields(
        { name: 'Bot Name', value: 'Som Helper BT', inline: true },
        { name: 'Description', value: 'These are the stats of Som Help BT, not of the whole bot', inline: false },
        { name: 'Created by', value: 'Black Tiger', inline: true },
        { name: 'Hosting', value: 'Replit', inline: true },
        { name: 'Discord.js version', value: '22', inline: true },
        { name: 'Total servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Bot created on', value: 'April 13, 2025', inline: true },
        { name: 'Important links', value: '[Invite me](https://discord.com/oauth2/authorize?client_id=1360906231182659625)  |  [Support Server](https://discord.gg/TY6PjAMgHG)', inline: false }
      )
      .setThumbnail(client.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed] });
  }
};
