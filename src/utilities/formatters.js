const { MessageMentions } = require('discord.js');

const regexes = [
   MessageMentions.EVERYONE_PATTERN,
   MessageMentions.ROLES_PATTERN,
   MessageMentions.USERS_PATTERN,
];

const replacers = [
   () => 'at-everyone',
   (role, { mentions: { roles } }) => roles.get(role).name,
   (user, { mentions: { users } }) => {
      const u = users.get(user);
      return `${u.username}(${u.tag})`;
   },
];

const sanitizeMessageContent = (message) => {
   if (!message) return '';
   let sanitizedMessage = message.content || '';

   regexes.forEach((regex, id) => {
      const matches = sanitizedMessage.matchAll(regex);
      for (const match of matches) {
         sanitizedMessage = sanitizedMessage.replace(
            match[0],
            `@${replacers[id](match[1], message)}`
         );
      }
   });
   return sanitizedMessage;
};

module.exports = {
   sanitizeMessageContent,
};
