const mysql = require('mysql');
const settings = require('../../../settings.json');

const connection = mysql.createConnection({
   ...settings.mySql,
});

module.exports = {
   query: (callback, onErr, onCatch) => {
      try {
         connection.connect(onErr);
         callback(connection);
         connection.query('', () => {});
         connection.end(onErr);
      } catch (error) {
         onCatch ? onCatch(error) : onErr && onErr(error);
      }
   },
};
