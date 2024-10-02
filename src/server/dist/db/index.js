"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _config = _interopRequireDefault(require("../config"));
var _mysql = _interopRequireDefault(require("mysql")); // Connection object we can create queries fro
// Default built in component
var connection = _mysql["default"].createPool(_config["default"].mysql);var _default = exports["default"] =

connection;
//# sourceMappingURL=index.js.map