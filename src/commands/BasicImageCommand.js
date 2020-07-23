const { Command } = require('discord.js-commando');
const settings = require('../../../settings.json');

module.exports = class BasicImageCommand extends Command {
   files = [];
   run(message) {
      message.author = null;
      return message.channel.send({
         files: this.files.map((file) => settings.relativeImgFolder + file),
      });
   }
};
