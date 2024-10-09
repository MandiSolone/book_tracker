import express from "express";
import morgan from "morgan"; // For logging
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; 
import { dirname } from 'path';
import apiRouter from "./routes/index.js"; // Aggregated routes
import config from "./config/index.js"; // the config file // mysql, port, oauth
import { errorHandler } from "./middlewares/errorHandler.js";
//OAuth
import passport from "passport"; // From auth.routes
import session from "express-session"; // Dev & Prod session stors for user info
import RedisStore from 'connect-redis';

import { createClient } from "redis";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRouter from "./routes/auth.routes.js"; // Import the new auth routes 
// resp from mysqlUrls> promise>query>UserDbTable>output here
import { googleAuthCallback, serializeUser, deserializeUser,} from "./controllers/auth.controller.js";

// Main async function
const startServer = async () => {


// Determine Redis URL based on environment (dev or prod)
const redisUrl = process.env.REDISCLOUD_URL || 'redis://localhost:6379';
const redisClient = createClient({url: redisUrl});

console.log('redisUrl:', redisUrl);
console.log('redisClient:', redisClient); 

  // Connect to the Redis client
try {
    await redisClient.connect();
    console.log('Connected to Redis')

    // Initialize your Express app here
    const app = express();

 // Configure the session store
const sessionStore = new RedisStore({ client: redisClient });
console.log("sessionStore", sessionStore)

// OAuth session middleware
// Has to be at the top, before initalizing Passport and defining any routes
app.use(
  session({
    store: sessionStore,
    secret: config.oauth.sessionSecret, // Use session secret from config
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false }, // Set true in production if using HTTPS
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Set secure to true only in production
      httpOnly: true, // Recommended for security
      sameSite: 'lax', // helps mitigate CSRF attacks by allowing cookies to be sent only in first-party contexts
      maxAge: 24 * 60 * 60 * 1000 // 1 day (optional, adjust as needed)
    }, 
        rolling: true, // Reset cookie expiration on each request
        unset: 'destroy', // Destroy sessions when they are no longer needed    
  })
);

//console.loging the session//delete later 
app.use((req, res, next) => {
  console.log('Session before authentication:', req.session);
  next();
});

        // Async function to test Redis connection
        const testRedisConnection = async () => {
          try {
              await redisClient.set('test_key', 'test_value');
              const value = await redisClient.get('test_key');
              console.log(`Value from Redis: ${value}`); // Should output: test_value
          } catch (error) {
              console.error('Redis Operation Error', error);
          }
      };

     // Call the async function
     await testRedisConnection();


// Initialize Passport Library
app.use(passport.initialize());
app.use(passport.session());

// Middleware
// Parses inc req and attaches JSON to body parameter of the request object
app.use(express.json());

// Enables incoming requests from cors origin domains
// CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. By specifying an exact origin, you allow requests only from that domain, while blocking others.
// Good for using multi domains
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // React app URL
  credentials: true, // Allow credentials to be sent
};
app.use(cors(corsOptions));

// Logs incoming request information to the dev console (url, resp, req)
app.use(morgan("dev"));

// Passport configuration for Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: config.oauth.googleClientId, //config/index.js 
      clientSecret: config.oauth.googleClientSecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // Google Callback URL in .env
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
app.use("/auth", authRouter);

// Serve static files from the React app (front end) __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = path.join(__dirname, "..", "../client/build");
console.log("Serving static files from:", staticPath);
app.use(express.static(staticPath));

// Handle GET all requests to serve the React app (front end)
app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Default Error handler middleware, place code at the bottom 
app.use(errorHandler);

// Bind the app to a specified port
app.listen(config.port || 8080, () =>
  console.log(`Server listening on port ${config.port}...`)
);

} catch (err) {
  console.error('Redis Client Connection Error', err);
}
};

// Start the server
startServer();