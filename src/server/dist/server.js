"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _index = _interopRequireDefault(require("./routes/index.js"));
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
app.use((0, _expressSession["default"])({ secret: _config["default"].oauth.sessionSecret, // Use session secret
      resave: false, saveUninitialized: true,
      cookie: { secure: false } // Set true in production if using HTTPS
    })
);

// Initialize Passport
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

// Middleware
// Parses inc req and attaches JSON to body parameter of the request object
app.use(_express["default"].json());

// Enables incoming requests from cors origin domains
// CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. By specifying an exact origin, you allow requests only from that domain, while blocking others.
var corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // React app URL
  credentials: true // Allow credentials to be sent
};
app.use((0, _cors["default"])(corsOptions));

// Logs incoming request information to the dev console (url, resp, req)
app.use((0, _morgan["default"])("dev"));

// Passport configuration for Google OAuth
_passport["default"].use(
  new _passportGoogleOauth.Strategy(
    {
      clientID: _config["default"].oauth.googleClientId,
      clientSecret: _config["default"].oauth.googleClientSecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL // Google Callback URL in .env
    },
    _auth2.googleAuthCallback
  )
);

// Serialize and deserialize user
_passport["default"].serializeUser(_auth2.serializeUser);
_passport["default"].deserializeUser(_auth2.deserializeUser);

// Directs all routes starting with /api to the top level api express router http://localhost:8080/api/...
app.use("/api", _index["default"]);
// Attach the auth router
app.use(_auth["default"]);

// Middleware to serve static files from the React app or you can copy/past into server public folder to route there
// allows the server to serve the static files (like JavaScript, CSS, and images) from the React build folder.

// console.log("Serving static files from:", path.join(__dirname, '../client/build'));
// app.use(express.static(path.join(__dirname, '../client/build')));

// console.log("Serving static files from:", path.join(process.cwd(), 'client/build'));
// app.use(express.static(path.join(process.cwd(), 'client/build')));

// Serve static files from the React app
var staticPath = _path["default"].join(__dirname, '../client/build');
console.log("Serving static files from:", staticPath);
app.use(_express["default"]["static"](staticPath));

// Handle all GET requests to serve the React app
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(staticPath, 'index.html'));
});
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// Default Error handler middleware
// Goes at the bottom
app.use(_errorHandler.errorHandler);

// Bind the app to a specified port
// Access app at http://localhost:<port>
app.listen(_config["default"].port || 8080, function () {return (
    console.log("Server listening on port ".concat(_config["default"].port, "...")));}
);
//# sourceMappingURL=server.js.map