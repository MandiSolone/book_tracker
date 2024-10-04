(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "./index"], factory);} else if (typeof exports !== "undefined") {factory(exports, require("./index"));} else {var mod = { exports: {} };factory(mod.exports, global.index);global.utils = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _index) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(_exports, "__esModule", { value: true });_exports["default"] = void 0;_index = _interopRequireDefault(_index);

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
  };var _default = _exports["default"] =

  query;});
//# sourceMappingURL=utils.js.map