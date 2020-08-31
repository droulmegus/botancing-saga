const BasicImageCommand = require('../BasicImageCommand');

module.exports = class CarteCommand extends BasicImageCommand {
   constructor(client) {
      super(client, {
         name: 'carte',
         aliases: ['cart', 'map'],
         group: 'aides',
         memberName: 'carte',
         description: 'La carte.',
      });
   }
   files = ['map.gif'];
};
