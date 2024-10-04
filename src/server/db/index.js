import config from "../config/index.js";// Connection object we can create queries fro
import mysql from "mysql";// Default built in component

const connection = mysql.createPool(config.mysql);

export default connection;
