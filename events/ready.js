const { ActivityType, ChannelType } = require('discord.js');
const colors = require('colors');
var AsciiTable = require('ascii-table');
var table = new AsciiTable();
table.setHeading('Mongo Database', 'Stats').setBorder('|', '=', "0", "0");
const mongoose = require('mongoose');
const { mongoURL, topggAPI } = require('../config.js');
const client = require(process.cwd() + '/src/index.js')

client.on("ready", async (client) => {
  const serverCount = client.guilds.cache.size;
  client.user.setActivity({
    name: 'I am Somalian 👀',
    type: ActivityType.Watching,
  });
  await client.application.commands.set(client.slashCommands.map(command => command.data));


  if (!mongoURL) {
    console.log(colors.magenta('Mongo Database • Disconnected'))
    console.log(colors.magenta('0===========================0'));
  } else {
    await mongoose.connect(mongoURL);
    console.log(colors.magenta('Mongo Database • Connected'))
    console.log(colors.magenta('0===========================0'));
  };
  if (!client.slashCommands) {
    console.log(colors.blue('Slash Commands • Not Registered'))
    console.log(colors.blue('0===========================0'));
  } else {
    console.log(colors.blue('Slash Commands • Registered'))
    console.log(colors.blue('0===========================0'));
  }
  if (client) {
    console.log(colors.red('${client.user.tag} • Online'))
    console.log(colors.red('0===========================0'));
    } else {
      console.log(colors.red('Client not found'));
    console.log(colors.red('0===========================0'));
  }

  const userCount = client.users.cache.size;
  console.log('userCount: ${userCount}\nserverCount: ${serverCount}');
}); 