(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "express", "passport"], factory);} else if (typeof exports !== "undefined") {factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("express"), require("passport"));} else {var mod = { exports: {} };factory(mod.exports, global.regenerator, global.asyncToGenerator, global.express, global.passport);global.authRoutes = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _regenerator, _asyncToGenerator2, _express, _passport) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(_exports, "__esModule", { value: true });_exports["default"] = void 0;_regenerator = _interopRequireDefault(_regenerator);_asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);_express = _interopRequireDefault(_express);_passport = _interopRequireDefault(_passport); // Using Google OAuth to sign in 

  // Used Passport Library - middleware for handling authentication

  var AuthRouter = _express["default"].Router();

  var redirectUrl = process.env.CLIENT_URL || 'http://localhost:8080/'; // Use the environment variable

  // Redirect to Google for authentication
  AuthRouter.get('/google', _passport["default"].authenticate('google', {
    scope: ['profile', 'email']
    // prompt: 'select_account' // This will prompt the user to select an account each time they sign in 
  }));

  // Callback route for Google to redirect to
  AuthRouter.get('/google/callback',
  _passport["default"].authenticate('google', { failureRedirect: '/' }), /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(
      function _callee(req, res) {return _regenerator["default"].wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:
              console.log('Authenticated User:', req.user);
              res.redirect(redirectUrl); // Redirect to the account/home page (Client side) after auth
            case 2:case "end":return _context.stop();}}, _callee);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}()
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
  });var _default = _exports["default"] =

  AuthRouter;});
//# sourceMappingURL=auth.routes.js.map