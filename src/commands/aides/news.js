const { Permissions } = require('discord.js');

const BasicCommand = require('../BasicCommand');
const settings = require('../../../../settings.json');
const {
   mysql,
   sanitizeMessageContent,
   checkPermissionsAsync,
} = require('../../utilities');

const settingName = 'NewsChannel';
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
               key: 'channel',
               prompt: 'Canal contenant les dernières nouvelles',
               type: 'channel',
               default: false,
            },
         ],
         guildOnly: true,
      });
   }

   getChannelId(cb) {
      mysql.query(
         (connection) => {
            connection.query(
               'SELECT Value FROM Settings WHERE Name = ?',
               [settingName],
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

   setChannel(channel, cb) {
      mysql.query(
         (connection) => {
            connection.query(
               'UPDATE Settings SET Value = ? WHERE Name = ?',
               [channel.id, settingName],
               function (err) {
                  if (err) {
                     console.error(err);
                     throw err;
                  }
                  cb(true);
               }
            );
         },
         (err) => {
            if (err) {
               console.error(err);
               cb(false);
            }
         }
      );
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

   run(message, { channel }) {
      if (channel) {
         checkPermissionsAsync([Permissions.FLAGS.ADMINISTRATOR], message).then(
            (authorized) => {
               if (authorized) {
                  message.author = null;
                  this.setChannel(channel, (done) => {
                     message.reply(
                        done ? 'Canal mis à jour' : 'Canal non mis à jour'
                     );
                  });
               } else {
                  message.author = null;
                  message.reply(
                     'Seul un administrateur peut changer le canal.'
                  );
               }
            }
         );
      } else {
         message.author = null;
         this.getChannelId((id) => this.getNews(id, message));
      }
   }
};
