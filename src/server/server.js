import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import apiRouter from "./routes/index.js"; // Aggregated routes
import config from "./config/index.js"; // The config file mysql, port, oauth
import { errorHandler } from "./middlewares/errorHandler.js";
//OAuth and Redis
import passport from "passport"; // From auth.routes
import session from "express-session"; // Dev & Prod session stors for user info
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRouter from "./routes/auth.routes.js"; // Import the new auth routes
// Resp from mysqlUrls > promise > query > UserDbTable > output here
import {
  googleAuthCallback,
  serializeUser,
  deserializeUser,
} from "./controllers/auth.controller.js";

// Main async function
const startServer = async () => {

  // Determine Redis URL based on environment (dev or prod)
  const redisUrl = process.env.REDISCLOUD_URL || "redis://localhost:6379";
  const redisClient = createClient({ url: redisUrl });

  // Connect to the Redis client
  try {
    await redisClient.connect();
    const app = express();// Initialize your Express app here
    const sessionStore = new RedisStore({ client: redisClient });// Configure the session store

    // OAuth session middleware- At the top, before initalizing Passport and defining any routes
    app.use(
      session({
        store: sessionStore,
        secret: config.oauth.sessionSecret, // Use session secret from config
        resave: false,
        saveUninitialized: true, // Create a seesion for every user that accesse site, even if they haven't auth.
        // saveUninitialized: false, //recommended, especially if you're concerned about session storage efficiency and want to avoid creating empty sessions.
        cookie: {
          secure: false, // Tempararily set to fales for debugging
          // secure: process.env.NODE_ENV === "production", // Set secure to true only in production
          httpOnly: true, // Recommended for security
          sameSite: "lax", // Helps mitigate CSRF attacks by allowing cookies to be sent only in first-party contexts
          maxAge: 24 * 60 * 60 * 1000, // 1 day (optional, adjust as needed)
        },
        rolling: true, // Reset cookie expiration on each request
        unset: "destroy", // Destroy sessions when they are no longer needed
      })
    );

    // Initialize Passport Library
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json());// Middleware, Parses inc req and attaches JSON to body parameter of the request object

    // CORS allows using multi domains
    const corsOptions = {
      origin: process.env.CLIENT_URL || "http://localhost:3000", 
      credentials: true, // Allow credentials to be sent
    };
    app.use(cors(corsOptions));

    app.use(morgan("dev"));// Logs incoming request information to the dev console (url, resp, req)

    // Passport configuration for Google OAuth
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.oauth.googleClientId, // Config/index.js
          clientSecret: config.oauth.googleClientSecret,
          callbackURL: process.env.GOOGLE_CALLBACK_URL, // Google Callback URL in .env
        },
        googleAuthCallback
      )
    );

    // Serialize and deserialize user- Add lines after session middleware and before defining routes
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser); 

    // Define routers
    app.use("/api", apiRouter);
    app.use("/auth", authRouter);

    // Serve static files from the React app (front end) __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const staticPath = path.join(__dirname, "..", "../client/build");
    console.log("server - Serving static files from:", staticPath);
    app.use(express.static(staticPath));

    // Handle GET all requests to serve the React app (front end)
    app.get("*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });

    app.use(errorHandler); // Default Error handler middleware, place code at the bottom

    // Bind the app to a specified port
    app.listen(config.port || 8080, () =>
      console.log(`Server listening on port ${config.port}...`)
    );
  } catch (err) {
    console.error("server - Redis Client Connection Error", err);
  }
};

// Start the server
startServer();
