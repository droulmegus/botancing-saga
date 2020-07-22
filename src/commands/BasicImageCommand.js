const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class BasicImageCommand extends Command {
   files = [];
   run(message) {
      message.author = null;
      return message.channel.send({
         files: this.files.map((file) =>
            paths.resolve(__dirname, 'botancing-saga', file)
         ),
      });
   }
};
