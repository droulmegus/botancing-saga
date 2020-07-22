const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class BasicTextCommand extends Command {
   texts = [];
   run(message) {
      message.author = null;
      let promise;
      const { texts, files } = this;
      texts.forEach((text, id) => {
         if (!promise) {
            promise = message.reply(text);
         } else {
            promise = promise.then(() =>
               message.reply(text, {
                  files:
                     id === texts.length - 1
                        ? files.map((file) =>
                             path.resolve(__dirname, 'botancing-saga', file)
                          )
                        : undefined,
               })
            );
         }
      });
      return promise;
   }
};
