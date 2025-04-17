const { ownerIds, prefix } = require('../config');
const Discord = require('discord.js');
const client = require(process.cwd() + '/src/index.js');

client.on("messageCreate", async msg => {
  if (!msg.content || msg.author.bot || !msg.guild) return;

  if (!msg.content.startsWith(prefix)) return; // Check prefix

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase(); // Get command name

  const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
  if (command) {
    try {
      await command.execute({ client, Discord, args, prefix, msg });
    } catch (error) {
      console.error('Error executing command:', error);
      return msg.reply('There was an error executing that command!');
    }
  }
});