const BasicCommand = require('../BasicCommand');
const settings = require('../../../../settings.json');
const {
   texts: {
      args: { getErrorInteger, getPromptInteger },
   },
} = require('../../utilities');

const upperLim = 100;

module.exports = class ClearCommand extends BasicCommand {
   constructor(client) {
      super(client, {
         name: 'clear',
         aliases: ['nettoie', 'clearing', 'suppr'],
         group: 'misc',
         memberName: 'clear',
         description:
            'Retire un nombre de messages envoyés par le bot dans le canal parmi les ' +
            upperLim +
            ' derniers messages.',
         args: [
            {
               key: 'nombre',
               error: getErrorInteger('nombre', 1, upperLim),
               prompt: getPromptInteger('nombre', 1, upperLim),
               type: 'integer',
               default: 1,
               wait: 10,
               max: upperLim,
               min: 1,
            },
         ],
         guildOnly: true,
      });
   }

   run(message, { nombre }) {
      if (nombre > 0) {
         message.channel.messages
            .fetch({ limit: upperLim, cache: true })
            .then(() => {
               const deleteMessage = (m) => {
                  message.channel.messages.delete(m);
               };
               console.error(
                  message.channel.messages.cache.filter(
                     (m) => m.author.id == settings.botId
                  ).array.length
               );
               const toDelete = message.channel.messages.cache
                  .filter((m) => m.author.id == settings.botId)
                  .sort((a, b) => a.createdAt > b.createdAt)
                  .first(Math.min(upperLim, nombre));

               if (toDelete.each) {
                  toDelete.each(deleteMessage);
               } else {
                  if (toDelete.forEach) {
                     toDelete.forEach(deleteMessage);
                  } else {
                     toDelete && deleteMessage(toDelete);
                  }
               }
            });
      }
   }
};
