(function (global, factory) {if (typeof define === "function" && define.amd) {define(["express", "morgan", "cors", "./routes/index.js", "./config", "./middlewares/errorHandler", "./routes/auth.routes", "passport", "express-session", "./controllers/auth.controller", "passport-google-oauth20", "path"], factory);} else if (typeof exports !== "undefined") {factory(require("express"), require("morgan"), require("cors"), require("./routes/index.js"), require("./config"), require("./middlewares/errorHandler"), require("./routes/auth.routes"), require("passport"), require("express-session"), require("./controllers/auth.controller"), require("passport-google-oauth20"), require("path"));} else {var mod = { exports: {} };factory(global.express, global.morgan, global.cors, global.index, global.config, global.errorHandler, global.auth, global.passport, global.expressSession, global.auth, global.passportGoogleOauth20, global.path);global.server = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_express, _morgan, _cors, _index, _config, _errorHandler, _auth, _passport, _expressSession, _auth2, _passportGoogleOauth, _path) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");_express = _interopRequireDefault(_express);_morgan = _interopRequireDefault(_morgan);_cors = _interopRequireDefault(_cors);_index = _interopRequireDefault(_index);_config = _interopRequireDefault(_config);_auth = _interopRequireDefault(_auth);_passport = _interopRequireDefault(_passport);_expressSession = _interopRequireDefault(_expressSession);_path = _interopRequireDefault(_path);
  // For logging

  // Aggregated routes
  // the config file

  //OAuth
  // Import the new auth routes
  // From auth.routes







  //Static React files


  var app = (0, _express["default"])();

  // OAuth session middleware
  // Has to be at the top, before initalizing Passport and defining any routes
  app.use(
    (0, _expressSession["default"])({
      secret: _config["default"].oauth.sessionSecret, // Use session secret
      resave: false,
      saveUninitialized: true,
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
  );});
//# sourceMappingURL=server.js.map