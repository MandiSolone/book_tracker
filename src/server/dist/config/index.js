(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "dotenv", "path"], factory);} else if (typeof exports !== "undefined") {factory(exports, require("dotenv"), require("path"));} else {var mod = { exports: {} };factory(mod.exports, global.dotenv, global.path);global.index = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _dotenv, _path) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(_exports, "__esModule", { value: true });_exports["default"] = void 0;_dotenv = _interopRequireDefault(_dotenv);_path = _interopRequireDefault(_path); //A Node.js package depenecy that needs to be instaled



  // First, try to load .env from one directory up
  var primaryPath = _path["default"].join(__dirname, "..", ".env");
  var primaryEnvFound = _dotenv["default"].config({ path: primaryPath });

  if (primaryEnvFound.error) {
    // If the first attempt fails, try loading from two directories up
    var fallbackPath = _path["default"].join(__dirname, "..", "..", ".env");
    var fallbackEnvFound = _dotenv["default"].config({ path: fallbackPath });

    if (fallbackEnvFound.error) {
      throw new Error("Couldn't find .env file!");
    }
  }

  // exports configuration
  var _default = _exports["default"] = {
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
  };});
//# sourceMappingURL=index.js.map