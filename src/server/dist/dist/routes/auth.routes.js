"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport")); // Using Google OAuth to sign in 
// Used Passport Library - middleware for handling authentication
var AuthRouter = _express["default"].Router();

var redirectUrl = process.env.CLIENT_URL || 'http://localhost:3000/'; // Use the environment variable

// Redirect to Google for authentication
AuthRouter.get('/google', _passport["default"].authenticate('google', {
  scope: ['profile', 'email']
  // prompt: 'select_account' // This will prompt the user to select an account each time they sign in 
}));

// Callback route for Google to redirect to
AuthRouter.get('/google/callback',
_passport["default"].authenticate('google', { failureRedirect: '/' }), /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(
    function _callee(req, res) {return _regenerator["default"].wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:
            res.redirect(redirectUrl); // Redirect to the account/home page (Client side) after auth
          case 1:case "end":return _context.stop();}}, _callee);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}()
);

// User profile route
AuthRouter.get('/profile', /*#__PURE__*/function () {var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:
          if (req.isAuthenticated()) {
            res.json(req.user); // Return the authenticated user
          } else {
            res.status(401).json({ message: 'User not authenticated' });
          }case 1:case "end":return _context2.stop();}}, _callee2);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}()
);

// Logout endpoint
AuthRouter.post('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) return next(err);
    req.session = null; // Clear session data
    res.redirect('/loggedout'); // Redirect after logout
  });
});var _default = exports["default"] =

AuthRouter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3Bhc3Nwb3J0IiwiQXV0aFJvdXRlciIsIlJvdXRlciIsInJlZGlyZWN0VXJsIiwicHJvY2VzcyIsImVudiIsIkNMSUVOVF9VUkwiLCJnZXQiLCJhdXRoZW50aWNhdGUiLCJzY29wZSIsImZhaWx1cmVSZWRpcmVjdCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJyZWRpcmVjdCIsInN0b3AiLCJfeCIsIl94MiIsImFwcGx5IiwiYXJndW1lbnRzIiwiX3JlZjIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImlzQXV0aGVudGljYXRlZCIsImpzb24iLCJ1c2VyIiwic3RhdHVzIiwibWVzc2FnZSIsIl94MyIsIl94NCIsInBvc3QiLCJsb2dvdXQiLCJlcnIiLCJzZXNzaW9uIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL2F1dGgucm91dGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFVzaW5nIEdvb2dsZSBPQXV0aCB0byBzaWduIGluIFxuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBwYXNzcG9ydCBmcm9tIFwicGFzc3BvcnRcIjsvLyBVc2VkIFBhc3Nwb3J0IExpYnJhcnkgLSBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBhdXRoZW50aWNhdGlvblxuXG5jb25zdCBBdXRoUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuY29uc3QgcmVkaXJlY3RVcmwgPSBwcm9jZXNzLmVudi5DTElFTlRfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvJzsgLy8gVXNlIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZVxuXG4vLyBSZWRpcmVjdCB0byBHb29nbGUgZm9yIGF1dGhlbnRpY2F0aW9uXG5BdXRoUm91dGVyLmdldCgnL2dvb2dsZScsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnZ29vZ2xlJywgeyBcbiAgICBzY29wZTogWydwcm9maWxlJywgJ2VtYWlsJ10sIFxuICAgIC8vIHByb21wdDogJ3NlbGVjdF9hY2NvdW50JyAvLyBUaGlzIHdpbGwgcHJvbXB0IHRoZSB1c2VyIHRvIHNlbGVjdCBhbiBhY2NvdW50IGVhY2ggdGltZSB0aGV5IHNpZ24gaW4gXG59KSk7XG5cbi8vIENhbGxiYWNrIHJvdXRlIGZvciBHb29nbGUgdG8gcmVkaXJlY3QgdG9cbkF1dGhSb3V0ZXIuZ2V0KCcvZ29vZ2xlL2NhbGxiYWNrJywgXG4gICAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdnb29nbGUnLCB7IGZhaWx1cmVSZWRpcmVjdDogJy8nIH0pLFxuICAgIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMucmVkaXJlY3QocmVkaXJlY3RVcmwpOyAvLyBSZWRpcmVjdCB0byB0aGUgYWNjb3VudC9ob21lIHBhZ2UgKENsaWVudCBzaWRlKSBhZnRlciBhdXRoXG4gICAgfVxuKTtcblxuLy8gVXNlciBwcm9maWxlIHJvdXRlXG5BdXRoUm91dGVyLmdldCgnL3Byb2ZpbGUnLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICBpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgIHJlcy5qc29uKHJlcS51c2VyKTsgLy8gUmV0dXJuIHRoZSBhdXRoZW50aWNhdGVkIHVzZXJcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6ICdVc2VyIG5vdCBhdXRoZW50aWNhdGVkJyB9KTtcbiAgICB9XG59KTtcblxuLy8gTG9nb3V0IGVuZHBvaW50XG5BdXRoUm91dGVyLnBvc3QoJy9sb2dvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICByZXEubG9nb3V0KChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgcmVxLnNlc3Npb24gPSBudWxsOyAvLyBDbGVhciBzZXNzaW9uIGRhdGFcbiAgICAgICAgcmVzLnJlZGlyZWN0KCcvbG9nZ2Vkb3V0Jyk7IC8vIFJlZGlyZWN0IGFmdGVyIGxvZ291dFxuICAgIH0pO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF1dGhSb3V0ZXI7Il0sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBQUEsUUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsU0FBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBLGNBQWdDLENBRmhDO0FBRWdDO0FBRWhDLElBQU1FLFVBQVUsR0FBR0osUUFBQSxXQUFPLENBQUNLLE1BQU0sQ0FBQyxDQUFDOztBQUVuQyxJQUFNQyxXQUFXLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLElBQUksd0JBQXdCLENBQUMsQ0FBQzs7QUFFeEU7QUFDQUwsVUFBVSxDQUFDTSxHQUFHLENBQUMsU0FBUyxFQUFFUCxTQUFBLFdBQVEsQ0FBQ1EsWUFBWSxDQUFDLFFBQVEsRUFBRTtFQUN0REMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU87RUFDMUI7QUFDSixDQUFDLENBQUMsQ0FBQzs7QUFFSDtBQUNBUixVQUFVLENBQUNNLEdBQUcsQ0FBQyxrQkFBa0I7QUFDN0JQLFNBQUEsV0FBUSxDQUFDUSxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUVFLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLGdDQUFBQyxJQUFBLE9BQUFDLGtCQUFBLDBCQUFBQyxZQUFBLFlBQUFDLElBQUE7SUFDekQsU0FBQUMsUUFBT0MsR0FBRyxFQUFFQyxHQUFHLFVBQUFKLFlBQUEsWUFBQUssSUFBQSxVQUFBQyxTQUFBQyxRQUFBLHFCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1lBQ1hMLEdBQUcsQ0FBQ00sUUFBUSxDQUFDcEIsV0FBVyxDQUFDLENBQUMsQ0FBQztVQUFBLHlCQUFBaUIsUUFBQSxDQUFBSSxJQUFBLE9BQUFULE9BQUEsR0FDOUIsb0JBQUFVLEVBQUEsRUFBQUMsR0FBQSxVQUFBZixJQUFBLENBQUFnQixLQUFBLE9BQUFDLFNBQUE7QUFDTCxDQUFDOztBQUVEO0FBQ0EzQixVQUFVLENBQUNNLEdBQUcsQ0FBQyxVQUFVLGdDQUFBc0IsS0FBQSxPQUFBakIsa0JBQUEsMEJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUFFLFNBQUFnQixTQUFPZCxHQUFHLEVBQUVDLEdBQUcsVUFBQUosWUFBQSxZQUFBSyxJQUFBLFVBQUFhLFVBQUFDLFNBQUEscUJBQUFBLFNBQUEsQ0FBQVgsSUFBQSxHQUFBVyxTQUFBLENBQUFWLElBQUE7VUFDdEMsSUFBSU4sR0FBRyxDQUFDaUIsZUFBZSxDQUFDLENBQUMsRUFBRTtZQUN2QmhCLEdBQUcsQ0FBQ2lCLElBQUksQ0FBQ2xCLEdBQUcsQ0FBQ21CLElBQUksQ0FBQyxDQUFDLENBQUM7VUFDeEIsQ0FBQyxNQUFNO1lBQ0hsQixHQUFHLENBQUNtQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNGLElBQUksQ0FBQyxFQUFFRyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1VBQy9ELENBQUMseUJBQUFMLFNBQUEsQ0FBQVIsSUFBQSxPQUFBTSxRQUFBLEdBQ0osb0JBQUFRLEdBQUEsRUFBQUMsR0FBQSxVQUFBVixLQUFBLENBQUFGLEtBQUEsT0FBQUMsU0FBQTtBQUFBLENBQUM7O0FBRUY7QUFDQTNCLFVBQVUsQ0FBQ3VDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBQ3hCLEdBQUcsRUFBRUMsR0FBRyxFQUFLO0VBQ3JDRCxHQUFHLENBQUN5QixNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFLO0lBQ2hCLElBQUlBLEdBQUcsRUFBRSxPQUFPcEIsSUFBSSxDQUFDb0IsR0FBRyxDQUFDO0lBQ3pCMUIsR0FBRyxDQUFDMkIsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BCMUIsR0FBRyxDQUFDTSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztFQUNoQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxJQUFBcUIsUUFBQSxHQUFBQyxPQUFBOztBQUVZNUMsVUFBVSIsImlnbm9yZUxpc3QiOltdfQ==