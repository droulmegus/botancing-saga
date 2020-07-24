const BasicCommand = require('./BasicCommand');
const settings = require('../../../settings.json');

module.exports = class BasicImageCommand extends BasicCommand {
   files = [];
   run(message) {
      message.author = null;
      return message.channel.send({
         files: this.files.map((file) => settings.relativeImgFolder + file),
      });
   }
};
