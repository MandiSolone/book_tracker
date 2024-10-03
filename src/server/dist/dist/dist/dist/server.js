"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _index = _interopRequireDefault(require("./routes/index"));
var _config = _interopRequireDefault(require("./config"));
var _errorHandler = require("./middlewares/errorHandler");
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _auth2 = require("./controllers/auth.controller");
var _passportGoogleOauth = require("passport-google-oauth20");
var _path = _interopRequireDefault(require("path")); // For logging
// Aggregated routes
// the config file
//OAuth
// Import the new auth routes
// From auth.routes
//Static React files 
var app = (0, _express["default"])(); // OAuth Set up session middleware
// Has to be at the top, before initalizing Passport and defining any routes
app.use((0, _expressSession["default"])({
  secret: _config["default"].oauth.sessionSecret,
  // Use session secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  } // Set true in production if using HTTPS
}));

// Initialize Passport
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

// Middleware
// Parses inc req and attaches JSON to body parameter of the request object
app.use(_express["default"].json());

// Enables incoming requests from cors origin domains
// CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. By specifying an exact origin, you allow requests only from that domain, while blocking others.
var corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  // React app URL
  credentials: true // Allow credentials to be sent
};
app.use((0, _cors["default"])(corsOptions));

// Logs incoming request information to the dev console (url, resp, req)
app.use((0, _morgan["default"])("dev"));

// Passport configuration for Google OAuth
_passport["default"].use(new _passportGoogleOauth.Strategy({
  clientID: _config["default"].oauth.googleClientId,
  clientSecret: _config["default"].oauth.googleClientSecret,
  callbackURL: process.env.GOOGLE_CALLBACK_URL // Google Callback URL in .env
}, _auth2.googleAuthCallback));

// Serialize and deserialize user
_passport["default"].serializeUser(_auth2.serializeUser);
_passport["default"].deserializeUser(_auth2.deserializeUser);

// Directs all routes starting with /api to the top level api express router http://localhost:8080/api/...
app.use("/api", _index["default"]);
// Attach the auth router
app.use(_auth["default"]);

// Middleware to serve static files from the React app or you can copy/past into server public folder to route there
// allows the server to serve the static files (like JavaScript, CSS, and images) from the React build folder.
console.log("Serving static files from:", _path["default"].join(__dirname, '../client/build'));
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../client/build')));

// /**
//  * Sends the react app index.html for page requests

//  * Only needed in production when you are not using the react dev server
//  */
// app.use((req, res, next) => {
//   try {
//     res.sendFile(join(__dirname, "../client/build/index.html"));
//   } catch (error) {
//     next(error);
//   }
// });

//  * Only needed in production when you are not using the react dev server
// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
// If your React app uses client-side routing (like React Router), the catch-all route (app.get('*', ...)) will serve the index.html file for any path that doesn’t match an API route. This allows the React app to take over routing on the client side.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../client/build', 'index.html'));
});

// Default Error handler middleware
// Goes at the bottom
app.use(_errorHandler.errorHandler);

// Bind the app to a specified port
// Access app at http://localhost:<port>
app.listen(_config["default"].port || 8080, function () {
  return console.log("Server listening on port ".concat(_config["default"].port, "..."));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9leHByZXNzIiwiX21vcmdhbiIsIl9jb3JzIiwiX2luZGV4IiwiX2NvbmZpZyIsIl9lcnJvckhhbmRsZXIiLCJfYXV0aCIsIl9wYXNzcG9ydCIsIl9leHByZXNzU2Vzc2lvbiIsIl9hdXRoMiIsIl9wYXNzcG9ydEdvb2dsZU9hdXRoIiwiX3BhdGgiLCJhcHAiLCJ1c2UiLCJzZWNyZXQiLCJvYXV0aCIsInNlc3Npb25TZWNyZXQiLCJyZXNhdmUiLCJzYXZlVW5pbml0aWFsaXplZCIsImNvb2tpZSIsInNlY3VyZSIsImluaXRpYWxpemUiLCJzZXNzaW9uIiwianNvbiIsImNvcnNPcHRpb25zIiwib3JpZ2luIiwicHJvY2VzcyIsImVudiIsIkNMSUVOVF9VUkwiLCJjcmVkZW50aWFscyIsIlN0cmF0ZWd5IiwiY2xpZW50SUQiLCJnb29nbGVDbGllbnRJZCIsImNsaWVudFNlY3JldCIsImdvb2dsZUNsaWVudFNlY3JldCIsImNhbGxiYWNrVVJMIiwiR09PR0xFX0NBTExCQUNLX1VSTCIsImdvb2dsZUF1dGhDYWxsYmFjayIsInNlcmlhbGl6ZVVzZXIiLCJkZXNlcmlhbGl6ZVVzZXIiLCJjb25zb2xlIiwibG9nIiwiam9pbiIsIl9fZGlybmFtZSIsImdldCIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwiZXJyb3JIYW5kbGVyIiwibGlzdGVuIiwicG9ydCIsImNvbmNhdCJdLCJzb3VyY2VzIjpbIi4uL3NlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG52YXIgX2V4cHJlc3MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJleHByZXNzXCIpKTtcbnZhciBfbW9yZ2FuID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwibW9yZ2FuXCIpKTtcbnZhciBfY29ycyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImNvcnNcIikpO1xudmFyIF9pbmRleCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm91dGVzL2luZGV4XCIpKTtcbnZhciBfY29uZmlnID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9jb25maWdcIikpO1xudmFyIF9lcnJvckhhbmRsZXIgPSByZXF1aXJlKFwiLi9taWRkbGV3YXJlcy9lcnJvckhhbmRsZXJcIik7XG52YXIgX2F1dGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JvdXRlcy9hdXRoLnJvdXRlc1wiKSk7XG52YXIgX3Bhc3Nwb3J0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicGFzc3BvcnRcIikpO1xudmFyIF9leHByZXNzU2Vzc2lvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKSk7XG52YXIgX2F1dGgyID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvYXV0aC5jb250cm9sbGVyXCIpO1xudmFyIF9wYXNzcG9ydEdvb2dsZU9hdXRoID0gcmVxdWlyZShcInBhc3Nwb3J0LWdvb2dsZS1vYXV0aDIwXCIpO1xudmFyIF9wYXRoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicGF0aFwiKSk7IC8vIEZvciBsb2dnaW5nXG4vLyBBZ2dyZWdhdGVkIHJvdXRlc1xuLy8gdGhlIGNvbmZpZyBmaWxlXG4vL09BdXRoXG4vLyBJbXBvcnQgdGhlIG5ldyBhdXRoIHJvdXRlc1xuLy8gRnJvbSBhdXRoLnJvdXRlc1xuLy9TdGF0aWMgUmVhY3QgZmlsZXMgXG52YXIgYXBwID0gKDAsIF9leHByZXNzW1wiZGVmYXVsdFwiXSkoKTsgLy8gT0F1dGggU2V0IHVwIHNlc3Npb24gbWlkZGxld2FyZVxuLy8gSGFzIHRvIGJlIGF0IHRoZSB0b3AsIGJlZm9yZSBpbml0YWxpemluZyBQYXNzcG9ydCBhbmQgZGVmaW5pbmcgYW55IHJvdXRlc1xuYXBwLnVzZSgoMCwgX2V4cHJlc3NTZXNzaW9uW1wiZGVmYXVsdFwiXSkoe1xuICBzZWNyZXQ6IF9jb25maWdbXCJkZWZhdWx0XCJdLm9hdXRoLnNlc3Npb25TZWNyZXQsXG4gIC8vIFVzZSBzZXNzaW9uIHNlY3JldFxuICByZXNhdmU6IGZhbHNlLFxuICBzYXZlVW5pbml0aWFsaXplZDogdHJ1ZSxcbiAgY29va2llOiB7XG4gICAgc2VjdXJlOiBmYWxzZVxuICB9IC8vIFNldCB0cnVlIGluIHByb2R1Y3Rpb24gaWYgdXNpbmcgSFRUUFNcbn0pKTtcblxuLy8gSW5pdGlhbGl6ZSBQYXNzcG9ydFxuYXBwLnVzZShfcGFzc3BvcnRbXCJkZWZhdWx0XCJdLmluaXRpYWxpemUoKSk7XG5hcHAudXNlKF9wYXNzcG9ydFtcImRlZmF1bHRcIl0uc2Vzc2lvbigpKTtcblxuLy8gTWlkZGxld2FyZVxuLy8gUGFyc2VzIGluYyByZXEgYW5kIGF0dGFjaGVzIEpTT04gdG8gYm9keSBwYXJhbWV0ZXIgb2YgdGhlIHJlcXVlc3Qgb2JqZWN0XG5hcHAudXNlKF9leHByZXNzW1wiZGVmYXVsdFwiXS5qc29uKCkpO1xuXG4vLyBFbmFibGVzIGluY29taW5nIHJlcXVlc3RzIGZyb20gY29ycyBvcmlnaW4gZG9tYWluc1xuLy8gQ09SUyBpcyBhIG1lY2hhbmlzbSB0aGF0IGFsbG93cyByZXN0cmljdGVkIHJlc291cmNlcyBvbiBhIHdlYiBwYWdlIHRvIGJlIHJlcXVlc3RlZCBmcm9tIGFub3RoZXIgZG9tYWluIG91dHNpZGUgdGhlIGRvbWFpbiBmcm9tIHdoaWNoIHRoZSByZXNvdXJjZSBvcmlnaW5hdGVkLiBCeSBzcGVjaWZ5aW5nIGFuIGV4YWN0IG9yaWdpbiwgeW91IGFsbG93IHJlcXVlc3RzIG9ubHkgZnJvbSB0aGF0IGRvbWFpbiwgd2hpbGUgYmxvY2tpbmcgb3RoZXJzLlxudmFyIGNvcnNPcHRpb25zID0ge1xuICBvcmlnaW46IHByb2Nlc3MuZW52LkNMSUVOVF9VUkwgfHwgXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIixcbiAgLy8gUmVhY3QgYXBwIFVSTFxuICBjcmVkZW50aWFsczogdHJ1ZSAvLyBBbGxvdyBjcmVkZW50aWFscyB0byBiZSBzZW50XG59O1xuYXBwLnVzZSgoMCwgX2NvcnNbXCJkZWZhdWx0XCJdKShjb3JzT3B0aW9ucykpO1xuXG4vLyBMb2dzIGluY29taW5nIHJlcXVlc3QgaW5mb3JtYXRpb24gdG8gdGhlIGRldiBjb25zb2xlICh1cmwsIHJlc3AsIHJlcSlcbmFwcC51c2UoKDAsIF9tb3JnYW5bXCJkZWZhdWx0XCJdKShcImRldlwiKSk7XG5cbi8vIFBhc3Nwb3J0IGNvbmZpZ3VyYXRpb24gZm9yIEdvb2dsZSBPQXV0aFxuX3Bhc3Nwb3J0W1wiZGVmYXVsdFwiXS51c2UobmV3IF9wYXNzcG9ydEdvb2dsZU9hdXRoLlN0cmF0ZWd5KHtcbiAgY2xpZW50SUQ6IF9jb25maWdbXCJkZWZhdWx0XCJdLm9hdXRoLmdvb2dsZUNsaWVudElkLFxuICBjbGllbnRTZWNyZXQ6IF9jb25maWdbXCJkZWZhdWx0XCJdLm9hdXRoLmdvb2dsZUNsaWVudFNlY3JldCxcbiAgY2FsbGJhY2tVUkw6IHByb2Nlc3MuZW52LkdPT0dMRV9DQUxMQkFDS19VUkwgLy8gR29vZ2xlIENhbGxiYWNrIFVSTCBpbiAuZW52XG59LCBfYXV0aDIuZ29vZ2xlQXV0aENhbGxiYWNrKSk7XG5cbi8vIFNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgdXNlclxuX3Bhc3Nwb3J0W1wiZGVmYXVsdFwiXS5zZXJpYWxpemVVc2VyKF9hdXRoMi5zZXJpYWxpemVVc2VyKTtcbl9wYXNzcG9ydFtcImRlZmF1bHRcIl0uZGVzZXJpYWxpemVVc2VyKF9hdXRoMi5kZXNlcmlhbGl6ZVVzZXIpO1xuXG4vLyBEaXJlY3RzIGFsbCByb3V0ZXMgc3RhcnRpbmcgd2l0aCAvYXBpIHRvIHRoZSB0b3AgbGV2ZWwgYXBpIGV4cHJlc3Mgcm91dGVyIGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvLi4uXG5hcHAudXNlKFwiL2FwaVwiLCBfaW5kZXhbXCJkZWZhdWx0XCJdKTtcbi8vIEF0dGFjaCB0aGUgYXV0aCByb3V0ZXJcbmFwcC51c2UoX2F1dGhbXCJkZWZhdWx0XCJdKTtcblxuLy8gTWlkZGxld2FyZSB0byBzZXJ2ZSBzdGF0aWMgZmlsZXMgZnJvbSB0aGUgUmVhY3QgYXBwIG9yIHlvdSBjYW4gY29weS9wYXN0IGludG8gc2VydmVyIHB1YmxpYyBmb2xkZXIgdG8gcm91dGUgdGhlcmVcbi8vIGFsbG93cyB0aGUgc2VydmVyIHRvIHNlcnZlIHRoZSBzdGF0aWMgZmlsZXMgKGxpa2UgSmF2YVNjcmlwdCwgQ1NTLCBhbmQgaW1hZ2VzKSBmcm9tIHRoZSBSZWFjdCBidWlsZCBmb2xkZXIuXG5jb25zb2xlLmxvZyhcIlNlcnZpbmcgc3RhdGljIGZpbGVzIGZyb206XCIsIF9wYXRoW1wiZGVmYXVsdFwiXS5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9idWlsZCcpKTtcbmFwcC51c2UoX2V4cHJlc3NbXCJkZWZhdWx0XCJdW1wic3RhdGljXCJdKF9wYXRoW1wiZGVmYXVsdFwiXS5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9idWlsZCcpKSk7XG5cbi8vIC8qKlxuLy8gICogU2VuZHMgdGhlIHJlYWN0IGFwcCBpbmRleC5odG1sIGZvciBwYWdlIHJlcXVlc3RzXG5cbi8vICAqIE9ubHkgbmVlZGVkIGluIHByb2R1Y3Rpb24gd2hlbiB5b3UgYXJlIG5vdCB1c2luZyB0aGUgcmVhY3QgZGV2IHNlcnZlclxuLy8gICovXG4vLyBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuLy8gICB0cnkge1xuLy8gICAgIHJlcy5zZW5kRmlsZShqb2luKF9fZGlybmFtZSwgXCIuLi9jbGllbnQvYnVpbGQvaW5kZXguaHRtbFwiKSk7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgbmV4dChlcnJvcik7XG4vLyAgIH1cbi8vIH0pO1xuXG4vLyAgKiBPbmx5IG5lZWRlZCBpbiBwcm9kdWN0aW9uIHdoZW4geW91IGFyZSBub3QgdXNpbmcgdGhlIHJlYWN0IGRldiBzZXJ2ZXJcbi8vIFRoZSBcImNhdGNoYWxsXCIgaGFuZGxlcjogZm9yIGFueSByZXF1ZXN0IHRoYXQgZG9lc24ndCBtYXRjaCBvbmUgYWJvdmUsIHNlbmQgYmFjayBSZWFjdCdzIGluZGV4Lmh0bWwgZmlsZS5cbi8vIElmIHlvdXIgUmVhY3QgYXBwIHVzZXMgY2xpZW50LXNpZGUgcm91dGluZyAobGlrZSBSZWFjdCBSb3V0ZXIpLCB0aGUgY2F0Y2gtYWxsIHJvdXRlIChhcHAuZ2V0KCcqJywgLi4uKSkgd2lsbCBzZXJ2ZSB0aGUgaW5kZXguaHRtbCBmaWxlIGZvciBhbnkgcGF0aCB0aGF0IGRvZXNu4oCZdCBtYXRjaCBhbiBBUEkgcm91dGUuIFRoaXMgYWxsb3dzIHRoZSBSZWFjdCBhcHAgdG8gdGFrZSBvdmVyIHJvdXRpbmcgb24gdGhlIGNsaWVudCBzaWRlLlxuLy8gYXBwLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuLy8gICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9idWlsZC9pbmRleC5odG1sJykpO1xuLy8gfSk7XG5hcHAuZ2V0KCcqJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gIHJlcy5zZW5kRmlsZShfcGF0aFtcImRlZmF1bHRcIl0uam9pbihfX2Rpcm5hbWUsICcuLi9jbGllbnQvYnVpbGQnLCAnaW5kZXguaHRtbCcpKTtcbn0pO1xuXG4vLyBEZWZhdWx0IEVycm9yIGhhbmRsZXIgbWlkZGxld2FyZVxuLy8gR29lcyBhdCB0aGUgYm90dG9tXG5hcHAudXNlKF9lcnJvckhhbmRsZXIuZXJyb3JIYW5kbGVyKTtcblxuLy8gQmluZCB0aGUgYXBwIHRvIGEgc3BlY2lmaWVkIHBvcnRcbi8vIEFjY2VzcyBhcHAgYXQgaHR0cDovL2xvY2FsaG9zdDo8cG9ydD5cbmFwcC5saXN0ZW4oX2NvbmZpZ1tcImRlZmF1bHRcIl0ucG9ydCB8fCA4MDgwLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjb25zb2xlLmxvZyhcIlNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCBcIi5jb25jYXQoX2NvbmZpZ1tcImRlZmF1bHRcIl0ucG9ydCwgXCIuLi5cIikpO1xufSk7Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUVaLElBQUlBLHNCQUFzQixHQUFHQyxPQUFPLENBQUMsOENBQThDLENBQUM7QUFDcEYsSUFBSUMsUUFBUSxHQUFHRixzQkFBc0IsQ0FBQ0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pELElBQUlFLE9BQU8sR0FBR0gsc0JBQXNCLENBQUNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RCxJQUFJRyxLQUFLLEdBQUdKLHNCQUFzQixDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkQsSUFBSUksTUFBTSxHQUFHTCxzQkFBc0IsQ0FBQ0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsSUFBSUssT0FBTyxHQUFHTixzQkFBc0IsQ0FBQ0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pELElBQUlNLGFBQWEsR0FBR04sT0FBTyxDQUFDLDRCQUE0QixDQUFDO0FBQ3pELElBQUlPLEtBQUssR0FBR1Isc0JBQXNCLENBQUNDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ25FLElBQUlRLFNBQVMsR0FBR1Qsc0JBQXNCLENBQUNDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMzRCxJQUFJUyxlQUFlLEdBQUdWLHNCQUFzQixDQUFDQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN4RSxJQUFJVSxNQUFNLEdBQUdWLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQztBQUNyRCxJQUFJVyxvQkFBb0IsR0FBR1gsT0FBTyxDQUFDLHlCQUF5QixDQUFDO0FBQzdELElBQUlZLEtBQUssR0FBR2Isc0JBQXNCLENBQUNDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFD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