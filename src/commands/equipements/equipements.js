const BasicTextCommand = require('../BasicTextCommand');

module.exports = class EquipementsCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'equipements',
         aliases: ['equip', 'équipements', 'équip'],
         group: 'equipements',
         memberName: 'equipements',
         description:
            'Lien vers le Google doc contenant les infos sur le stuff',
      });
   }

   texts = [
      'https://docs.google.com/spreadsheets/d/13hTJZ1md2sidB7rpomCBDugacLE13kupRoWXoaWyFLc/edit#gid=1924103824',
   ];
};
