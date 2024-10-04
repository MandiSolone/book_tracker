import config from "../config/index.js"; // local config file
import mysql from "mysql"; // Default built in component

// const connection = mysql.createPool(config.mysql);

var connection;

if (process.env.NODE_ENV === 'production') {
  // Use ClearDB_DATABASE_URL from Heroku
  var clearDBUrl = process.env.CLEARDB_DATABASE_URL;

  // Create a connection pool from the ClearDB URL
  connection = mysql.createPool({
    uri: clearDBUrl
    // Note: May need to parse the URL if using mysql2
  });
} else {
  // Use local MySQL config
  connection = mysql.createPool(config.mysql);
}

export default connection;
//# sourceMappingURL=index.js.map