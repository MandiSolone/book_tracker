import connection from "./index.js";

/**
 * Returns a promise that resolves with the results of SQL query
 *
 * @param {string} qryStr
 * @param {Array \ any} values
 * @returns The results of a SQL query
 */

var query = function query(qryStr, values) {
  return new Promise(function (resolve, reject) {
    connection.query(qryStr, values, function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export default query;
//# sourceMappingURL=utils.js.map