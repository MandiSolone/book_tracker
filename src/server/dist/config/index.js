"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));







var _path = _interopRequireDefault(require("path")); //A Node.js package depenecy that needs to be instaled
// Load environment variables
// const envFound = dotenv.config();
// if (!envFound) {
//   throw new Error("Couldn't find .env!");
// }
//Load env var from the .env file in the server directory 
// Load environment variables from the .env file in the server directory
var envFound = _dotenv["default"].config({ path: _path["default"].join(__dirname, '..', '.env') });if (envFound.error) {throw new Error("Couldn't find .env!");} // exports configuration
var _default = exports["default"] = {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
  },
  port: parseInt(process.env.PORT),
  oauth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET
  }
};
//# sourceMappingURL=index.js.map