const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all bot features and commands'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('My Prefix: `/`')
      .setDescription('**Owner:** Black Tiger')
      .addFields(
        {
          name: '**__Moderation__**',
          value:
            '`/ban` - Ban a member with duration and reason\n' +
            '`/unban` - Unban a member\n' +
            '`/timeout` - Timeout a user\n' +
            '`/untimeout` - Remove timeout from a user\n' +
            '`/warn` - Warn a user\n' +
            '`/kick` - Kick a member from the server'
        },
        {
          name: '**__Extra Features__**',
          value:
            '`/announce` - Make an announcement using the bot\n' +
            '`/answer` - Answer users using the bot\n' +
            '`/avatar` - Get the avatar of a user\n' +
            '`/botinfo` - Get info about the bot\n' +
            '`/serverinfo` - Get info about the server\n' +
            '`/userinfo` - Get info about a user\n' +
            '`/help` - Get help about the bot\n' +
            '`/ping` - Get the ping of the bot\n' +
            '`/stats` - See the stats of the bot\n' +
            '`/poll` - Make poll\n' +
            '`/dm` - Send message in users dm and you using the bot'
        },
        
       
        {
          name: '**__That\'s all the `/commands` of this bot!__**',
          value:
            'If you need any help or want to make your own bot for your server,\n' +
            '[Support Server](https://discord.gg/96WEKQtT4d)'
        }
      )
      .setColor('#5865F2'); // Discord blurple

    await interaction.reply({ embeds: [embed] });
  },
};