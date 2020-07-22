const BasicTextCommand = require('../BasicTextCommand');

module.exports = class ArmesCommand extends BasicTextCommand {
   constructor(client) {
      super(client, {
         name: 'armes',
         aliases: ['weapons'],
         group: 'equipements',
         memberName: 'armes',
         description:
            'Lien vers le Google doc contenant les infos sur le stuff (armes tab)',
      });
   }

   texts = [
      'https://docs.google.com/spreadsheets/d/13hTJZ1md2sidB7rpomCBDugacLE13kupRoWXoaWyFLc/edit#gid=983280247',
   ];
};
