
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const client = require('../index.js');

client.on('guildCreate', async (guild) => {
  try {
    const owner = await guild.fetchOwner();

    if (owner) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: owner.user.tag,
          iconURL: owner.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle("📁 Thanks for adding me.")
        .setDescription(
          `↪️ My default prefix is \`/\`\n` +
          `↪️ How the bot will work:\n` +
          `> *Make a role that has all permissions then give the role to the bot*\n\n` +
          `↪️ To know the bot info, type \`/botinfo\`\n\n` +
          `↪️ If you need how to use the bot, type \`/help\`\n\n` +
          `↪️ For detailed guides, FAQ, and more info:\n` +
          `> Join our **[Support Server](https://discord.gg/96WEKQtT4d)**`
        )
        .setColor(0x2b2d31) // Discord dark theme background
        .setThumbnail(owner.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Support')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/96WEKQtT4d'),
        new ButtonBuilder()
          .setLabel('Invite')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.com/oauth2/authorize?client_id=1360906231182659625') // Replace with your real website
      );

      await owner.send({ embeds: [embed], components: [row] });
      console.log(`Sent fancy welcome DM to ${owner.user.tag}`);
    }
  } catch (err) {
    console.error('Failed to send welcome DM:', err);
  }
});
