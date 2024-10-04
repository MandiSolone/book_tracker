(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "../db/utils"], factory);} else if (typeof exports !== "undefined") {factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("../db/utils"));} else {var mod = { exports: {} };factory(mod.exports, global.regenerator, global.asyncToGenerator, global.utils);global.authController = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _regenerator, _asyncToGenerator2, _utils) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(_exports, "__esModule", { value: true });_exports.serializeUser = _exports.googleAuthCallback = _exports.deserializeUser = void 0;_regenerator = _interopRequireDefault(_regenerator);_asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);_utils = _interopRequireDefault(_utils); // query is mySQL db sending commands to user table.


  // Google OAuth callback function
  var googleAuthCallback = _exports.googleAuthCallback = /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(
    accessToken,
    refreshToken,
    profile,
    done) {var userEmail, results, newUser, insertedUser;return _regenerator["default"].wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:

            userEmail = profile.emails[0].value;_context.prev = 1;_context.next = 4;return (



              (0, _utils["default"])("SELECT * FROM users WHERE email = ?", [
              userEmail]
              ));case 4:results = _context.sent;if (!(

            results.length > 0)) {_context.next = 9;break;}return _context.abrupt("return",
            done(null, results[0]));case 9:

            newUser = { email: userEmail, name: profile.displayName };_context.next = 12;return (
              (0, _utils["default"])("INSERT INTO users SET ?", newUser));case 12:_context.next = 14;return (
              (0, _utils["default"])("SELECT * FROM users WHERE email = ?", [
              userEmail]
              ));case 14:insertedUser = _context.sent;return _context.abrupt("return",
            done(null, insertedUser[0]));case 16:_context.next = 21;break;case 18:_context.prev = 18;_context.t0 = _context["catch"](1);return _context.abrupt("return",


            done(_context.t0));case 21:case "end":return _context.stop();}}, _callee, null, [[1, 18]]);}));return function googleAuthCallback(_x, _x2, _x3, _x4) {return _ref.apply(this, arguments);};}();



  // Serialize and deserialize user functions
  var serializeUser = _exports.serializeUser = function serializeUser(user, done) {
    done(null, user.id); // Use user.id to identify the user
  };

  var deserializeUser = _exports.deserializeUser = /*#__PURE__*/function () {var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(id, done) {var user;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_context2.next = 3;return (

              (0, _utils["default"])("SELECT * FROM users WHERE id = ?", [id]));case 3:user = _context2.sent;
            done(null, user[0]); // Pass the user object to the session
            _context2.next = 10;break;case 7:_context2.prev = 7;_context2.t0 = _context2["catch"](0);
            done(_context2.t0);case 10:case "end":return _context2.stop();}}, _callee2, null, [[0, 7]]);}));return function deserializeUser(_x5, _x6) {return _ref2.apply(this, arguments);};}();});
//# sourceMappingURL=auth.controller.js.map