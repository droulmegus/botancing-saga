const BasicTextCommand = require('../BasicTextCommand');

module.exports = class HeritageCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'vente',
         aliases: ['fragments'],
         group: 'aides',
         memberName: 'vente',
         description: "Faut-il vendre les fragments d'un style?",
      });
   }

   texts = [
      `Généralement il n'est pas conseillé de vendre les fragments d'un style qui n'est pas encore niveau 50 (total de 600 fragments).
   
Mais s'il s'agit d'un style que tu n'envisages pas de jouer, du genre \`Thérèse A\`, il est conseillé d'atteindre le niveau 42 (170 fragments), pour les points de maitrises d'armes, avant de vendre les fragments en trop.`,
   ];
};
