const { Command } = require('discord.js-commando');

module.exports = class BasicCommand extends Command {
   constructor(client, info) {
      super(client, {
         throttling: {
            usages: 1,
            duration: 5,
         },
         ...info,
      });
   }
};
