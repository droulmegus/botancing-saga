const BasicCommand = require('../BasicCommand');
const {
   formatStyleToEmbed,
   getStylesByName,
} = require('../../utilities/spreadsheet.styles');

const max = 3;

module.exports = class StylesCommand extends BasicCommand {
   constructor(client) {
      super(client, {
         name: 'styles',
         aliases: ['style'],
         group: 'styles',
         memberName: 'styles',
         args: [
            {
               key: 'style',
               prompt: 'Nom (complet ou partiel) du style voulu',
               type: 'string',
            },
         ],
         description:
            'Recherche les styles correspondant au nom donné. Les données sont obtenues via https://docs.google.com/spreadsheets/d/1AUquzPB0vDKYxOHC1uU4G7CNrNSNwLr89MOTWjQBNu0/edit?fbclid=IwAR3_z1fChnhTWIkVIQ5r3Dy9VneQqSq_mk_s3vSNXmiTy6WjyN0SOQEqOwY#gid=892217297',
      });
   }
   run(message, { style }) {
      message.author = null;

      if (!style || style.length < 0) {
         message.reply(
            'Réesayez en saisissant un nom de style partiel ou complet.'
         );
         return;
      }

      getStylesByName(style, async (styles) => {
         switch (styles.length) {
            case 0:
               message.reply('Aucun résultat trouvé.');
               break;
            case 1:
               message.reply(formatStyleToEmbed(styles[0]));
               break;
            default:
               message.reply(
                  'Plusieurs styles trouvés, saisir le chiffre associé avec le style pour continuer:\n' +
                     styles
                        .map((st, id) => `[${id}] - ${st.name} "${st.style}"`)
                        .join('\n')
               );
               message.channel
                  .awaitMessages((m) => m.author.id === authId, {
                     max: 1,
                     time: 30000,
                     errors: ['time'],
                  })
                  .then((result) => {
                     const index = result && parseInt(result.first(1));
                     if (!isNaN(index) && index < styles.length) {
                        message.reply(formatStyleToEmbed(styles[index]));
                     } else {
                        message.reply('Saisie invalide.');
                     }
                  })
                  .catch(() => {
                     message.reply("La requête n'a pas pu être complétée.");
                  });
               break;
         }
      });
   }
};
