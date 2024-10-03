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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfaW5kZXgiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsInF1ZXJ5IiwicXJ5U3RyIiwidmFsdWVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJyZXN1bHRzIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vZGIvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbm5lY3Rpb24gZnJvbSBcIi4vaW5kZXhcIjtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3VsdHMgb2YgU1FMIHF1ZXJ5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHFyeVN0clxuICogQHBhcmFtIHtBcnJheSBcXCBhbnl9IHZhbHVlc1xuICogQHJldHVybnMgVGhlIHJlc3VsdHMgb2YgYSBTUUwgcXVlcnlcbiAqL1xuXG5jb25zdCBxdWVyeSA9IChxcnlTdHIsIHZhbHVlcykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbm5lY3Rpb24ucXVlcnkocXJ5U3RyLCB2YWx1ZXMsIChlcnIsIHJlc3VsdHMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHF1ZXJ5O1xuIl0sIm1hcHBpbmdzIjoiNExBQUEsSUFBQUEsTUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFLQSxDQUFJQyxNQUFNLEVBQUVDLE1BQU0sRUFBSztFQUNoQyxPQUFPLElBQUlDLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUVDLE1BQU0sRUFBSztJQUN0Q1IsTUFBQSxXQUFVLENBQUNHLEtBQUssQ0FBQ0MsTUFBTSxFQUFFQyxNQUFNLEVBQUUsVUFBQ0ksR0FBRyxFQUFFQyxPQUFPLEVBQUs7TUFDakQsSUFBSUQsR0FBRyxFQUFFO1FBQ1BELE1BQU0sQ0FBQ0MsR0FBRyxDQUFDO01BQ2IsQ0FBQyxNQUFNO1FBQ0xGLE9BQU8sQ0FBQ0csT0FBTyxDQUFDO01BQ2xCO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLElBQUFDLFFBQUEsR0FBQUMsT0FBQTs7QUFFYVQsS0FBSyIsImlnbm9yZUxpc3QiOltdfQ==