const Commando = require('discord.js-commando');

const settings = require('../settings.json');

const client = new Commando.Client({
   commandPrefix: settings.prefix,
   owner: settings.owner,
   invite:
      'https://discord.com/oauth2/authorize?client_id=733801323816026143&scope=bot',
});
const path = require('path');

client.registry
   // Registers your custom command groups
   .registerGroups([
      ['aides', 'Aides pour le jeu'],
      ['equipements', 'Equipements'],
      [
         'misc',
         'Commandes diverse',
      ] /*
      ['styles', 'Commandes concernant les styles de personnages'],,*/,
   ])
   // Registers all built-in groups, commands, and argument types
   .registerDefaultTypes()
   .registerDefaultGroups()
   .registerDefaultCommands({
      commandState: false,
      eval: false,
      prefix: false,
      unknownCommand: false,
   })
   // Registers all of your commands in the ./commands/ directory
   .registerCommandsIn(path.join(__dirname, 'src/commands'));
client.once('ready', () => {
   console.log('Ready!');
});

client.on('guildMemberAdd', require('./src/events/guildMemberAdd'));

client.login(settings.token);
