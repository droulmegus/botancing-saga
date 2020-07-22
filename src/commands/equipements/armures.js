const BasicTextCommand = require('../BasicTextCommand');

module.exports = class ArmuresCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'armures',
         aliases: ['armors'],
         group: 'equipements',
         memberName: 'armures',
         description:
            'Lien vers le Google doc contenant les infos sur le stuff ( armures tab)',
      });
   }

   texts = [
      'https://docs.google.com/spreadsheets/d/13hTJZ1md2sidB7rpomCBDugacLE13kupRoWXoaWyFLc/edit#gid=1327021229',
   ];
};
