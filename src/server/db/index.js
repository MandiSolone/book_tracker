// Connection object we can create queries from
import config from "../config";
// Default built in component
import mysql from "mysql";

const connection = mysql.createPool(config.mysql);

export default connection;
