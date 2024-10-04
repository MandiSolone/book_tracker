(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "../config", "mysql"], factory);} else if (typeof exports !== "undefined") {factory(exports, require("../config"), require("mysql"));} else {var mod = { exports: {} };factory(mod.exports, global.config, global.mysql);global.index = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _config, _mysql) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(_exports, "__esModule", { value: true });_exports["default"] = void 0;_config = _interopRequireDefault(_config);_mysql = _interopRequireDefault(_mysql); // Connection object we can create queries fro
  // Default built in component

  var connection = _mysql["default"].createPool(_config["default"].mysql);var _default = _exports["default"] =

  connection;});
//# sourceMappingURL=index.js.map