const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ans')
    .setDescription('Answer a member with a custom message')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to mention')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Your message to the user')
        .setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const message = interaction.options.getString('message');

    // Send message in channel
    await interaction.channel.send(`${user} ${message}`);

    // Defer the reply and delete it (to hide who used the command)
    await interaction.deferReply({ ephemeral: true });
    setTimeout(() => interaction.deleteReply().catch(() => {}), 1000);
  },
};