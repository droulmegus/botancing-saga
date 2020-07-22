const BasicTextCommand = require('../BasicTextCommand');

module.exports = class ProtectionsCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'protections',
         aliases: ['prot'],
         group: 'equipements',
         memberName: 'protections',
         description:
            'Lien vers le Google doc contenant les infos sur le stuff (protections tab)',
      });
   }

   texts = [
      'https://docs.google.com/spreadsheets/d/13hTJZ1md2sidB7rpomCBDugacLE13kupRoWXoaWyFLc/edit#gid=320273892',
   ];
};
