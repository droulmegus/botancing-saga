const BasicTextCommand = require('../BasicTextCommand');

module.exports = class HeritageCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'heritage',
         aliases: ['herit', 'heriter', 'héritage'],
         group: 'aides',
         memberName: 'heritage',
         description: "Explications sur l'héritage de techniques/sorts",
      });
   }

   texts = [
      "Pour hériter d'une compétence/sort d'un autre style du même perso, il suffit d'apprendre cette compétence avec le style en question. Chacun en a 3, qui s'apprend aléatoirement en combat.",
      `Une fois la compétences désirée apprise, il est possible de la transférer au style principal de ce même perso. Pour cela, il faut aller dans la composition d'équipe, et cliquer sur le gros "+", juste en-dessous du stuff`,
   ];

   files = ['heritage-plus.png'];
};
