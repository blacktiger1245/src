const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Send a custom announcement to a selected text channel.')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel where the announcement will be sent')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText))
    .addStringOption(option =>
      option.setName('title')
        .setDescription('The title of the announcement')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The body of the announcement')
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('everyone')
        .setDescription('Mention @everyone in the announcement')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');
    const mentionEveryone = interaction.options.getBoolean('everyone') || false;

    if (!channel || channel.type !== ChannelType.GuildText) {
      return interaction.reply({ content: '❌ Please select a valid text channel.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(message)
      .setColor('#00BFFF')
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setFooter({
        text: `Sent by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();

    try {
      await channel.send({
        content: mentionEveryone ? '@everyone' : null,
        embeds: [embed]
      });
      await interaction.reply({ content: `✅ Announcement sent in ${channel}`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: '❌ Failed to send the announcement. Please check my permissions.',
        ephemeral: true
      });
    }
  }
};