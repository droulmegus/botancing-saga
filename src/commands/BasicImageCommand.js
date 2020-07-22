const { Command } = require('discord.js-commando');

module.exports = class BasicImageCommand extends Command {
   files = [];
   run(message) {
      message.author = null;
      return message.channel.send({
         files: this.files,
      });
   }
};
