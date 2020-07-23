const BasicImageCommand = require('../BasicImageCommand');

module.exports = class VeriteCommand extends BasicImageCommand {
   constructor(client) {
      super(client, {
         name: 'verite',
         aliases: ['truth', 'vérité', 'vérite', 'verité'],
         group: 'aides',
         memberName: 'verite',
         description: 'La vérité.',
      });
   }
   files = ['verite.png'];
};
