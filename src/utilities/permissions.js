const { owner } = require('../../../settings.json');

async function checkPermissions(message, permissions) {
   if (!permissions || !permissions.length) {
      return true;
   }

   if (message.author == null || message.guild == null) {
      return false;
   }

   return (
      message.author.id == owner ||
      (member && member.permissions && member.permissions.any(permissions))
   );
}

module.exports = { checkPermissions };
