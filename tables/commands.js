// tables/commands.js

const colors = require('colors');
const fs = require('fs');
const AsciiTable = require('ascii-table');
const table = new AsciiTable();
table.setHeading('Commands', 'Stats').setBorder('|', '=', '0', '0');

module.exports = client => {
  fs.readdirSync('./src/commands/').forEach(dir => {
    const files = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));

    if (!files || files.length <= 0) {
      console.log(colors.red(`No commands in directory ${dir}.`));
    }

    files.forEach(file => {
      try {
        let command = require(`../commands/${dir}/${file}`);

        if (command && command.name) {
          client.commands.set(command.name, command);

          if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach(alias => {
              client.aliases.set(alias, command.name);
            });
          }

          table.addRow(command.name, '✅');
        } else {
          console.error(colors.red(`Error loading command from file ${file}: Command or command.name is missing.`));
          table.addRow(file, 'â›”');
        }
      } catch (error) {
        console.error(colors.red(`Error loading command from file ${file}: ${error.message}`));
        table.addRow(file, 'â›”');
      }
    });
  });

  console.log(colors.blue(table.toString()));
}; 