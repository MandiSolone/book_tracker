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
var app = (0, _express["default"])(); // OAuth session middleware
// Has to be at the top, before initalizing Passport and defining any routes
app.use((0, _expressSession["default"])({ secret: _config["default"].oauth.sessionSecret, // Use session secret
      resave: false, saveUninitialized: true,
      cookie: { secure: false } // Set true in production if using HTTPS
    })
);

// Initialize Passport Library
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

// Middleware
// Parses inc req and attaches JSON to body parameter of the request object
app.use(_express["default"].json());

// Enables incoming requests from cors origin domains
// CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. By specifying an exact origin, you allow requests only from that domain, while blocking others.
// Good for using multi domains
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
//add these lines after session middleware and before defining routes
_passport["default"].serializeUser(_auth2.serializeUser);
_passport["default"].deserializeUser(_auth2.deserializeUser);

// Define routers
app.use("/api", _index["default"]);
// Attach the auth router
app.use("/auth", _auth["default"]);

// Serve static files from the React app (front end)
var staticPath = _path["default"].join(__dirname, "..", "../client/build");
console.log("Serving static files from:", staticPath);
app.use(_express["default"]["static"](staticPath));

// Handle GET all requests to serve the React app (front end)
app.get("*", function (req, res) {
  res.sendFile(_path["default"].join(staticPath, "index.html"));
});

// Default Error handler middleware
// Goes at the bottom
app.use(_errorHandler.errorHandler);

// Bind the app to a specified port
// Access app at http://localhost:<port>
app.listen(_config["default"].port || 8080, function () {return (
    console.log("Server listening on port ".concat(_config["default"].port, "...")));}
);
//# sourceMappingURL=server.js.map