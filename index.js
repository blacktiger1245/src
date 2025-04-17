const { token, mongoURL, color } = require('./config.js');
const fs = require('fs');
const ms = require('pretty-ms');
const config = require('./config.js');
require('dotenv').config();
const express = require('express');
const { ActivityType, Collection, GatewayIntentBits, Client, Collector, VoiceChannel, EmbedBuilder, Partials } = require('discord.js');
const app = express();

const Discord = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember
  ],
  allowedMentions: { repliedUser: false, parse: ['users'] }
});

// Express listener on the port (ensure this matches your server setup)
app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

app.get('/', (req, res) => {
  res.send('Online Yo Boy !');
});


module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();



  const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
          const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
          for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
    command.category = folder;
    client.commands.set(command.name, command);
    if(!command.aliases) continue;
    for (const aliase of command.aliases) {
      client.aliases.set(aliase, command.name)
    }

  }
};

const slashCommandFolders = fs.readdirSync('./src/slashCommands');
for (const folder of slashCommandFolders) {
  const slashCommandFiles = fs.readdirSync(`./src/slashCommands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of slashCommandFiles) {
    const slashCommand = require(`./slashCommands/${folder}/${file}`);
    slashCommand.category = folder;
    if (slashCommand.data) {
      client.slashCommands.set(slashCommand.data.name, slashCommand);
    }
  }
}

module.exports = client;
// Load event handler files
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  require(`./events/${file}`);
};

// Load table files
const tableFiles = fs.readdirSync('./src/tables').filter(file => file.endsWith('.js'));

for (const file of tableFiles) {
 client.on("ready", require(`./tables/${file}`));
}

const process = require('node:process');

process.on('unhandledRejection', async (reason, promise) => {
    console.log('Unsupported rejection at:', promise, 'Reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.log('Uncatchable exception:', err);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log('Monitor uncaught exceptions:', err, origin);
});

client.login(token)