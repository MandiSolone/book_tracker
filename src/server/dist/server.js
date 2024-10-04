import express from "express";
import morgan from "morgan"; // For logging
import cors from "cors";
import apiRouter from "./routes/index.js"; // Aggregated routes
import config from "./config/index.js"; // the config file
import { errorHandler } from "./middlewares/errorHandler.js";
//OAuth
import authRouter from "./routes/auth.routes.js"; // Import the new auth routes
import passport from "passport"; // From auth.routes
import session from "express-session";
import {
  googleAuthCallback,
  serializeUser,
  deserializeUser } from
"./controllers/auth.controller.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
//Static React files
import path from "path";

var app = express();

// OAuth session middleware
// Has to be at the top, before initalizing Passport and defining any routes
app.use(
  session({
    secret: config.oauth.sessionSecret, // Use session secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true in production if using HTTPS
  })
);

// Initialize Passport Library
app.use(passport.initialize());
app.use(passport.session());

// Middleware
// Parses inc req and attaches JSON to body parameter of the request object
app.use(express.json());

// Enables incoming requests from cors origin domains
// CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. By specifying an exact origin, you allow requests only from that domain, while blocking others.
// Good for using multi domains
var corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // React app URL
  credentials: true // Allow credentials to be sent
};
app.use(cors(corsOptions));

// Logs incoming request information to the dev console (url, resp, req)
app.use(morgan("dev"));

// Passport configuration for Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: config.oauth.googleClientId,
      clientSecret: config.oauth.googleClientSecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL // Google Callback URL in .env
    },
    googleAuthCallback
  )
);

// Serialize and deserialize user
//add these lines after session middleware and before defining routes
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Define routers
app.use("/api", apiRouter);
// Attach the auth router
app.use("/auth", authRouter);

// Serve static files from the React app (front end)
var staticPath = path.join(__dirname, "..", "../client/build");
console.log("Serving static files from:", staticPath);
app.use(express["static"](staticPath));

// Handle GET all requests to serve the React app (front end)
app.get("*", function (req, res) {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Default Error handler middleware
// Goes at the bottom
app.use(errorHandler);

// Bind the app to a specified port
// Access app at http://localhost:<port>
app.listen(config.port || 8080, function () {return (
    console.log("Server listening on port ".concat(config.port, "...")));}
);
//# sourceMappingURL=server.js.map