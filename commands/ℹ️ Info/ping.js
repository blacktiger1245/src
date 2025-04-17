module.exports = {
  usage: 'ping',
  name: 'ping',
  description: 'Shows the bot\'s ping.',
  async execute({ msg }) {
    try {

      const ping = Date.now() - msg.createdTimestamp;
      const latency = Math.abs(ping);
      const latencyFormatted = `${latency.toString().substring(0, 2)}ms`;
        const emoji = "🏓";

        await msg.reply(`${emoji} Pong! **${latencyFormatted}**!`);
    } catch (error) {
        console.error('An error occurred while executing the command:', error);
    }
  },
};