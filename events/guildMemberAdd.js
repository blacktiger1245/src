const { EmbedBuilder } = require('discord.js');
const client = require('../index.js');

// Replace with your actual server ID and welcome channel ID
const GUILD_ID = '1315383725835681812';
const WELCOME_CHANNEL_ID = '1362092090074333345';

client.on('guildMemberAdd', async (member) => {
  try {
    if (member.guild.id !== GUILD_ID) return;

    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) return;

    const welcomeEmbed = new EmbedBuilder()
      .setColor('#4CAF50')
      .setTitle(`${member.user.tag}`)
      .setDescription(`
${member} 

**Soo dhawoow kuna soodhawoow Som Helper BT Server**

Fadlan aqri sharciyada uyaalo serverka kana aqri halkaan <#1315383823558512780>

Hadii aad ubaahantahay wax caawinaad eh oo bot ka ku saabsan waxa ticket ka furataa halkaan <#1362093983425363989>

Hadii aad botka ku aragtay cilad ama aad rabto in update lagu sameyo oo wax lagu soodaro waxa nagula wadaagtaa halkaan <#1362094154586390778>

Hadii aad ubaahantahay in lagu sameyo bot adiga kuu qaas ah waxaad ka dalbataa halkaan <#1362095461430853864>

Kuna soo dhawoow server-ka.

Haddi aad rabto commands ka uu ka koobanyhay bot ka isticmal \`/help\`
      `)
      .setThumbnail('https://cdn.discordapp.com/attachments/1335289734125322370/1362102036761546823/file_000000004ecc61f7b0e8976218c15e3a_conversation_id67fbf289-49fc-800c-977f-5987643127c5message_idf08b4a1d-8e21-4021-8cec-f293d20e5e64.png?ex=68012be0&is=67ffda60&hm=28b8f844cdafb5b04ec118a5154906d3abe2716d9d0bf696bc87ac95aef8fb04&')
      .setImage('https://cdn.discordapp.com/attachments/1335289734125322370/1362108195740451122/standard_1_1.gif?ex=6801319c&is=67ffe01c&hm=9b193590177815313c26f88d7031f242b3461ef904dbacd87a96f08655a4fa2e&')
      .setFooter({ text: 'Som Helper BT • Soo Dhawoow!', iconURL: client.user.displayAvatarURL() })
      .setTimestamp();

    await channel.send({ embeds: [welcomeEmbed] });
  } catch (err) {
    console.error(`Error in guildMemberAdd event:`, err);
  }
});
