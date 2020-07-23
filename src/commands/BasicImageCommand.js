const { Command } = require('discord.js-commando');
const path = require('path');
const paths = require('../paths');

module.exports = class BasicImageCommand extends Command {
   files = [];
   run(message) {
      message.author = null;
      return message.channel.send({
         files: this.files.map((file) =>
            path.resolve(__dirname, paths.relativeImgFolder, file)
         ),
      });
   }
};
