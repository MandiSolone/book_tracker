import config from "../config/index.js";// local config file
import mysql from "mysql";// Default built in component
import url from "url"; // URL module for parsing, built in Node mod

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

let connection;

if (process.env.NODE_ENV === 'production') {
    // Use ClearDB_DATABASE_URL from Heroku
    const clearDBUrl = process.env.CLEARDB_DATABASE_URL;

    if (!clearDBUrl) {
        throw new Error("CLEARDB_DATABASE_URL is not defined");
    }

    const { hostname, username, password, pathname } = new url.URL(clearDBUrl);
    const database = pathname.slice(1); // Remove leading '/'
    
    connection = mysql.createPool({
        host: hostname,
        user: username,
        password: password,
        database: database,
    });
} else {
    // Use local MySQL config
    connection = mysql.createPool(config.mysql);
}

export default connection; // import connection to utils (wrap in promise)> export as query