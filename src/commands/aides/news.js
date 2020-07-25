const { Command } = require('discord.js-commando');

const BasicCommand = require('../BasicCommand');
const settings = require('../../../../settings.json');
const mysql = require('../../utilities/mysql');
const { sanitizeMessageContent } = require('../../utilities/formatters');

module.exports = class NewsCommand extends BasicCommand {
   constructor(client) {
      super(client, {
         name: 'news',
         aliases: ['nouvelles'],
         group: 'aides',
         memberName: 'news',
         description: 'Dernières nouvelles',
         args: [
            {
               key: 'canal',
               prompt: 'Canal contenant les dernières nouvelles',
               type: 'string',
               default: '',
            },
         ],
         guildOnly: true,
      });
   }

   getChannelId(cb) {
      mysql.query(
         (connection) => {
            connection.query(
               "SELECT Value FROM Settings WHERE Name = 'NewsChannel'",
               function (err, result) {
                  if (err) {
                     console.error(err);
                     throw err;
                  }
                  if (!result || !result[0] || !result[0].Value) {
                     throw new Error('Nope');
                  }
                  cb(result[0].Value);
               }
            );
         },
         (err) => {
            if (err) {
               console.error(err);
               cb(settings.defaultNewsChannel || '');
            }
         }
      );
   }

   setChannel() {
      //if(check si utilisatur a le droit de créer un channel)
   }

   async getNews(channelId, message) {
      try {
         const newsChannel =
            channelId &&
            channelId.length > 0 &&
            (await this.client.channels.fetch(channelId, false));
         if (newsChannel && newsChannel.messages) {
            newsChannel.messages.fetch({ limit: 1 }).then((messages) => {
               const effectiveMessages = messages
                  ? messages
                       .map((msg) => {
                          return sanitizeMessageContent(msg);
                       })
                       .filter((content) => content && content.length > 0)
                  : [];

               if (effectiveMessages != null && effectiveMessages.length > 0) {
                  message.reply(effectiveMessages[0]);
               } else {
                  throw new Error('Pas de message récent valide.');
               }
            });
         } else {
            throw new Error('Pas de message ou de channel.');
         }
      } catch (err) {
         console.error(err);
         message.reply(
            "Aucun canal défini ou celui défini n'existe pas/plus. Réessayer la commande en taguant le canal souhaité pour le définir."
         );
      }
   }

   run(message, { canal }) {
      message.author = null;
      if (canal && canal.length > 0) {
         this.setChannel(canal);
      } else {
         this.getChannelId((id) => this.getNews(id, message));
      }
   }
};
