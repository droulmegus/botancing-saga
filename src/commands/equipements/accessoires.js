const BasicTextCommand = require('../BasicTextCommand');

module.exports = class AccessoiresCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'accessoires',
         aliases: ['acc'],
         group: 'equipements',
         memberName: 'accessoires',
         description:
            'Lien vers le Google doc contenant les infos sur le stuff (accessoires tab)',
      });
   }

   texts = [
      'https://docs.google.com/spreadsheets/d/13hTJZ1md2sidB7rpomCBDugacLE13kupRoWXoaWyFLc/edit#gid=416752216',
   ];
};
