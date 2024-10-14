import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";import _regeneratorRuntime from "@babel/runtime/regenerator"; // query is mySQL db (local-dev or clear-heroku-production) 
// sending commands from google oauth to user table during sing in
import query from "../db/utils.js";

// Google OAuth callback function
export var googleAuthCallback = /*#__PURE__*/function () {var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(
  accessToken,
  refreshToken,
  profile,
  done) {var userEmail, results, newUser, insertedUser;return _regeneratorRuntime.wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:

          userEmail = profile.emails[0].value;_context.prev = 1;_context.next = 4;return (



            query("SELECT * FROM users WHERE email = ?", [
            userEmail]
            ));case 4:results = _context.sent;if (!(

          results.length > 0)) {_context.next = 9;break;}return _context.abrupt("return",
          done(null, results[0]));case 9:

          newUser = { email: userEmail, name: profile.displayName };_context.next = 12;return (
            query("INSERT INTO users SET ?", newUser));case 12:_context.next = 14;return (
            query("SELECT * FROM users WHERE email = ?", [
            userEmail]
            ));case 14:insertedUser = _context.sent;return _context.abrupt("return",
          done(null, insertedUser[0]));case 16:_context.next = 21;break;case 18:_context.prev = 18;_context.t0 = _context["catch"](1);return _context.abrupt("return",


          done(_context.t0));case 21:case "end":return _context.stop();}}, _callee, null, [[1, 18]]);}));return function googleAuthCallback(_x, _x2, _x3, _x4) {return _ref.apply(this, arguments);};}();



// Serialize and deserialize user functions exported
export var serializeUser = function serializeUser(user, done) {
  console.log('auth.controllers - Serializing user:', user); // Log user info being serialized
  done(null, user.id); // Use user.id to identify the user
};

export var deserializeUser = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(id, done) {var user;return _regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:
          console.log('auth.controllers - Deserializing user with ID:', id); // Log ID being deserialized
          _context2.prev = 1;_context2.next = 4;return (
            query("SELECT * FROM users WHERE id = ?", [id]));case 4:user = _context2.sent;
          console.log('auth.controllers - B - Deserializing user:', user[0]); // Log user info being deserialized
          done(null, user[0]); // Pass the user object to the session
          _context2.next = 13;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);
          console.error('auth.controllers - Database Error:', _context2.t0); // Log error for debugging
          done(_context2.t0);case 13:case "end":return _context2.stop();}}, _callee2, null, [[1, 9]]);}));return function deserializeUser(_x5, _x6) {return _ref2.apply(this, arguments);};}();
//# sourceMappingURL=auth.controller.js.map