// import config from "../config/index.js"; // local config file
// import mysql from "mysql"; // Default built in component
// import url from "url"; // URL module for parsing, built in Node mod

// const connection = mysql.createPool(config.mysql);

// let connection;

// if (process.env.NODE_ENV === 'production') {
//     // Use ClearDB_DATABASE_URL from Heroku
//     const clearDBUrl = process.env.CLEARDB_DATABASE_URL;

//     // Create a connection pool from the ClearDB URL
//     connection = mysql.createPool({
//       uri: clearDBUrl,
//       // Note: May need to parse the URL if using mysql2
//     });
//   } else {
//     // Use local MySQL config
//     connection = mysql.createPool(config.mysql);
//   }

import config from "../config/index.js"; // local config file
import mysql from "mysql"; // Default built in component
import url from "url"; // URL module for parsing, built in Node mod

var connection;

if (process.env.NODE_ENV === 'production') {
  console.log("Environment: Production");

  var clearDBUrl = process.env.CLEARDB_DATABASE_URL;
  console.log("ClearDB URL:", clearDBUrl); // Log the URL to ensure it's being picked up

  if (!clearDBUrl) {
    console.error("CLEARDB_DATABASE_URL is not defined");
    throw new Error("CLEARDB_DATABASE_URL is not defined");
  }

  try {
    var _url = new url.URL(clearDBUrl);
    var hostname = _url.hostname;
    var username = _url.username;
    var password = _url.password;
    var pathname = _url.pathname;
    var database = pathname.slice(1); // Remove leading '/'

    console.log("DB Config - Host:", hostname, "User:", username, "Database:", database); // Log the DB config

    connection = mysql.createPool({
      host: hostname,
      user: username,
      password: password,
      database: database
    });

    console.log("Database connection pool created for ClearDB.");
  } catch (error) {
    console.error("Error parsing ClearDB URL:", error);
  }
} else {
  console.log("Environment: Development");
  console.log("Using local MySQL config:", config.mysql);

  connection = mysql.createPool(config.mysql);
  console.log("Database connection pool created for local MySQL.");
}

export default connection; // import connection to utils (wrap in promise)> export as query
//# sourceMappingURL=index.js.map