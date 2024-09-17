import connection from "./index";

/** 
 * Returns a promise that resolves with the results of SQL query 
 * 
 * @param {string} qryStr
 * @param {Array \ any} values 
 * @returns The results of a SQL query 
 */

const query = (qryStr, values) => {
    return new Promise ((resolve, reject) => {
        connection.query(qryStr, values, (err, results) => {
            if (err) {
                reject(err); 
            } else {
                resolve(results);
            }
        });
    });
};

export default query; 