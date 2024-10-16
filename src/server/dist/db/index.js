import config from "../config/index.js"; // local config file
import mysql from "mysql"; // Default built in component
import url from "url"; // URL module for parsing, built in Node mod

var connection;

if (process.env.NODE_ENV === "production") {
  var clearDBUrl = process.env.CLEARDB_DATABASE_URL;

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

    connection = mysql.createPool({
      host: hostname,
      user: username,
      password: password,
      database: database
    });

    // Log when a connection is established
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("Error connecting to ClearDB:", err);
      } else {
        console.log("Successfully connected to ClearDB.");
        conn.release(); // Release the connection back to the pool
      }
    });
    console.log("Database connection pool created for ClearDB.");
  } catch (error) {
    console.error("Error parsing ClearDB URL:", error);
  }

  // If not prod(ClearDB), then dev (local MySQL)
} else {
  console.log("Environment: Development");
  connection = mysql.createPool(config.mysql);
  console.log("Database connection pool created for local MySQL.");
}

export default connection; // import connection to utils (wrap in promise)> export as query
//# sourceMappingURL=index.js.map