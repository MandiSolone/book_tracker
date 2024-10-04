import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";import _regeneratorRuntime from "@babel/runtime/regenerator"; // Using Google OAuth to sign in 
import express from "express";
import passport from "passport"; // Used Passport Library - middleware for handling authentication

var AuthRouter = express.Router();

var redirectUrl = process.env.CLIENT_URL || 'http://localhost:8080/'; // Use the environment variable

// Redirect to Google for authentication
AuthRouter.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
  // prompt: 'select_account' // This will prompt the user to select an account each time they sign in 
}));

// Callback route for Google to redirect to
AuthRouter.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/' }), /*#__PURE__*/function () {var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(
    function _callee(req, res) {return _regeneratorRuntime.wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:
            console.log('Authenticated User:', req.user);
            res.redirect(redirectUrl); // Redirect to the account/home page (Client side) after auth
          case 2:case "end":return _context.stop();}}, _callee);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}()
);

// User profile route
AuthRouter.get('/profile', /*#__PURE__*/function () {var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res) {return _regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:
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
});

export default AuthRouter;
//# sourceMappingURL=auth.routes.js.map