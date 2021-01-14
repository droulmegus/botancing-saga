const fs = require('fs');

const fileName = '../characters.stats.json';

let usingFile;

function isFileOutdated() {
   try {
      const stats = fs.statSync(fileName);
      const now = new Date();
      now.setMinutes(0);
      now.setHours(0);
      now.setSeconds(0);

      return stats.mtime < now && stats.ctime < now;
   } catch (error) {
      console.error(error);
      return true;
   }
}

function loadCharacterFile() {
   return new Promise((r) => {
      return r(null);
   });
}

function saveCharacters(data) {
   if (usingFile) {
      return null;
   }
   try {
      usingFile = true;
      return fs.writeFileSync(fileName, JSON.stringify(data)) == null;
   } catch (e) {
      console.error(e);
      return false;
   } finally {
      usingFile = false;
   }
}

module.exports = {
   loadCharacterFile,
   saveCharacters,
};
