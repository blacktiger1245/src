// tables/events.js

const fs = require('fs');
const colors = require('colors');
var AsciiTable = require('ascii-table');
var table = new AsciiTable();
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0");

module.exports = async client => {
  fs.readdirSync("./src/events").filter(f => f.endsWith(".js")).forEach(async file => {
      let event = require(`../events/${file}`);
      table.addRow(file.slice(0, -3), '✅');
    });
  console.log(colors.green(table.toString()));
};