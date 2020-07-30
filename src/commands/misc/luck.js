const BasicTextCommand = require('../BasicTextCommand');

module.exports = class LuckCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'luck',
         group: 'misc',
         memberName: 'luck',
         description: 'Donne moi la chance dans mes pulls!',
      });
   }
   texts = ['Niques tes morts, non.'];
};
