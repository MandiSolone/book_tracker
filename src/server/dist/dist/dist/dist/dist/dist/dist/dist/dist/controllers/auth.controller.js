"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.serializeUser = exports.googleAuthCallback = exports.deserializeUser = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _utils = _interopRequireDefault(require("../db/utils")); // query is mySQL db sending commands to user table.

// Google OAuth callback function
var googleAuthCallback = exports.googleAuthCallback = /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(
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
var serializeUser = exports.serializeUser = function serializeUser(user, done) {
  done(null, user.id); // Use user.id to identify the user
};

var deserializeUser = exports.deserializeUser = /*#__PURE__*/function () {var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(id, done) {var user;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_context2.next = 3;return (

            (0, _utils["default"])("SELECT * FROM users WHERE id = ?", [id]));case 3:user = _context2.sent;
          done(null, user[0]); // Pass the user object to the session
          _context2.next = 10;break;case 7:_context2.prev = 7;_context2.t0 = _context2["catch"](0);
          done(_context2.t0);case 10:case "end":return _context2.stop();}}, _callee2, null, [[0, 7]]);}));return function deserializeUser(_x5, _x6) {return _ref2.apply(this, arguments);};}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXRpbHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImdvb2dsZUF1dGhDYWxsYmFjayIsImV4cG9ydHMiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsInByb2ZpbGUiLCJkb25lIiwidXNlckVtYWlsIiwicmVzdWx0cyIsIm5ld1VzZXIiLCJpbnNlcnRlZFVzZXIiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiZW1haWxzIiwidmFsdWUiLCJzZW50IiwibGVuZ3RoIiwiYWJydXB0IiwiZW1haWwiLCJuYW1lIiwiZGlzcGxheU5hbWUiLCJ0MCIsInN0b3AiLCJfeCIsIl94MiIsIl94MyIsIl94NCIsImFwcGx5IiwiYXJndW1lbnRzIiwic2VyaWFsaXplVXNlciIsInVzZXIiLCJpZCIsImRlc2VyaWFsaXplVXNlciIsIl9yZWYyIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJfeDUiLCJfeDYiXSwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9hdXRoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcXVlcnkgaXMgbXlTUUwgZGIgc2VuZGluZyBjb21tYW5kcyB0byB1c2VyIHRhYmxlLlxuaW1wb3J0IHF1ZXJ5IGZyb20gXCIuLi9kYi91dGlsc1wiO1xuXG4vLyBHb29nbGUgT0F1dGggY2FsbGJhY2sgZnVuY3Rpb25cbmV4cG9ydCBjb25zdCBnb29nbGVBdXRoQ2FsbGJhY2sgPSBhc3luYyAoXG4gIGFjY2Vzc1Rva2VuLFxuICByZWZyZXNoVG9rZW4sXG4gIHByb2ZpbGUsXG4gIGRvbmVcbikgPT4ge1xuICBjb25zdCB1c2VyRW1haWwgPSBwcm9maWxlLmVtYWlsc1swXS52YWx1ZTtcblxuICB0cnkge1xuICAgIC8vIENoZWNrIGlmIHVzZXIgZXhpc3RzXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHF1ZXJ5KFwiU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ID9cIiwgW1xuICAgICAgdXNlckVtYWlsLFxuICAgIF0pO1xuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGRvbmUobnVsbCwgcmVzdWx0c1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1VzZXIgPSB7IGVtYWlsOiB1c2VyRW1haWwsIG5hbWU6IHByb2ZpbGUuZGlzcGxheU5hbWUgfTtcbiAgICAgIGF3YWl0IHF1ZXJ5KFwiSU5TRVJUIElOVE8gdXNlcnMgU0VUID9cIiwgbmV3VXNlcik7XG4gICAgICBjb25zdCBpbnNlcnRlZFVzZXIgPSBhd2FpdCBxdWVyeShcIlNFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgZW1haWwgPSA/XCIsIFtcbiAgICAgICAgdXNlckVtYWlsLFxuICAgICAgXSk7XG4gICAgICByZXR1cm4gZG9uZShudWxsLCBpbnNlcnRlZFVzZXJbMF0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgfVxufTtcblxuLy8gU2VyaWFsaXplIGFuZCBkZXNlcmlhbGl6ZSB1c2VyIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IHNlcmlhbGl6ZVVzZXIgPSAodXNlciwgZG9uZSkgPT4ge1xuICBkb25lKG51bGwsIHVzZXIuaWQpOyAvLyBVc2UgdXNlci5pZCB0byBpZGVudGlmeSB0aGUgdXNlclxufTtcblxuZXhwb3J0IGNvbnN0IGRlc2VyaWFsaXplVXNlciA9IGFzeW5jIChpZCwgZG9uZSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBxdWVyeShcIlNFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQgPSA/XCIsIFtpZF0pO1xuICAgIGRvbmUobnVsbCwgdXNlclswXSk7IC8vIFBhc3MgdGhlIHVzZXIgb2JqZWN0IHRvIHRoZSBzZXNz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