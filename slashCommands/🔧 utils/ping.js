
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows the bot\'s ping.'),
  async execute(interaction) {
    try {
      const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
      const ping = sent.createdTimestamp - interaction.createdTimestamp;
      const latency = Math.abs(ping);
      const latencyFormatted = `${latency.toString().substring(0, 2)}ms`;
      const emoji = "🏓";

      await interaction.editReply(`${emoji} Pong! **${latencyFormatted}**!`);
    } catch (error) {
      console.error('An error occurred while executing the command:', error);
    }
  },
};
