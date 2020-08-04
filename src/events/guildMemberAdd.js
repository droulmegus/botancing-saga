module.exports = (member) => {
   const colorChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725404704607043702'
   );
   const rsChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725013419861868604'
   );
   const pullChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725013419861868604'
   );
   const guideChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725015209160343602'
   );
   const teamChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725014212652564561'
   );
   const conseilsChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725013774104395896'
   );
   const blablaChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725013959773651094'
   );
   const autresChan = member.guild.channels.cache.find(
      (ch) => ch.id === '725013669066440754'
   );
   // Send the message to a designated channel on a server:
   member.send(`Bienvenue sur le serveur ${member.guild}, ${member}!
 N'hésites pas à choisir ta couleur de pseudo dans le canal ${colorChan}.
 
 Voici une courte présentations des channels les plus importants:
 - ${guideChan} : Plein de liens utiles qui répondront à la plupart des questions telles que "Où trouver une hache S et le bonus de stat recommandé".
 - ${conseilsChan} : Nouveau joueur souhaitant savoir s'il vaut mieux recommencer pour avoir de meilleures unités dès le début, envoies tes screens ici!
 - ${rsChan} : Où tu peux blablater et parler du jeu en général.
 - ${pullChan} : Tu as eu un super pull et tu veux le partager? C'est ici!
 - ${teamChan} : Tu veux faire du théorie crafting ou tu as une question sur qui choisir pour un défi spécifique? N'hésites pas à poser ta question ici!
 - ${autresChan} : Un nom très explicite :)
 - ${blablaChan} : Pour parler de tout et de rien.
 
 J'ai aussi d'autres commandes! N'hésites pas à taper \`-help\` pour en savoir plus.
 `);
};
