const BasicCommand = require('../BasicCommand');
const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
   .setColor('#0099ff')
   .setTitle(`Guide pour débutant`)
   .setURL(
      'https://docs.google.com/presentation/d/1ZL7XbRqNyBoQQ5GfKPk9ccEggcXL7xSCt629GFoA69k/edit#slide=id.p'
   )
   .setDescription(
      'Guide détaillant les éléments de jeu de Romancing Saga Re:Universe traduit et maintenu par Presti.'
   )
   .setThumbnail(
      'https://lh3.googleusercontent.com/EBRjVjXYq5uFmGE1Js6mni0pZpKtRHv_BYq5Ohq8Uws5li0O10ogoJSs_diCIg-RVQ=s180-rw'
   );

module.exports = class GuideDebutantCommand extends BasicCommand {
   constructor(client) {
      super(client, {
         name: 'guide',
         aliases: ['debutant'],
         group: 'aides',
         memberName: 'guide',
         description: 'Lien vers le guide débutant.',
      });
   }

   run(message) {
      message.reply(embed);
   }
};
