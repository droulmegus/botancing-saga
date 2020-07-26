const { owner } = require('../../../settings.json');

async function checkPermissionsAsync(permissions, message) {
   if (!permissions || !permissions.length) {
      return true;
   }

   if (message.author == null || message.guild == null) {
      return false;
   }

   if (message.author.id === owner) {
      return true;
   }

   const member = await message.guild.members.fetch(message.author.id);
   return member && member.permissions && member.permissions.any(permissions);
}

module.exports = { checkPermissionsAsync };
