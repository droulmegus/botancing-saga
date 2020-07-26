const mysql = require('mysql');
const settings = require('../../../settings.json');

module.exports = {
   query: (callback, onErr, onCatch) => {
      const connection = mysql.createConnection({
         ...settings.mySql,
      });
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
