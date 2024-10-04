"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _index = _interopRequireDefault(require("./index"));

/**
 * Returns a promise that resolves with the results of SQL query
 *
 * @param {string} qryStr
 * @param {Array \ any} values
 * @returns The results of a SQL query
 */

var query = function query(qryStr, values) {
  return new Promise(function (resolve, reject) {
    _index["default"].query(qryStr, values, function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};var _default = exports["default"] =

query;
//# sourceMappingURL=utils.js.map