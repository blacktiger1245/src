const Discord = require('discord.js');
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { color, prefix } = require('../config');
const ms = require('pretty-ms');

const client = require(process.cwd() + '/src/index.js')

client.on("interactionCreate", async (interaction) => {
  const commandName = interaction.commandName;
  if (!client.slashCommands) return;
  const slashCommand = client.slashCommands.get(commandName);
  if (!slashCommand) return
  try {
    return slashCommand.execute(interaction);
  } catch (error) {
    console.log(error)
    interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true 
    });
  }
}); 