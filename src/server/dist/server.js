import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";import _regeneratorRuntime from "@babel/runtime/regenerator";import express from "express";
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
import connectRedis from 'connect-redis';
import RedisStore from 'connect-redis';

import { createClient } from "redis";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRouter from "./routes/auth.routes.js"; // Import the new auth routes 
// resp from mysqlUrls> promise>query>UserDbTable>output here
import { googleAuthCallback, serializeUser, deserializeUser } from "./controllers/auth.controller.js";

// Main async function
var startServer = /*#__PURE__*/function () {var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {var redisUrl, redisClient, app, sessionStore, testRedisConnection, corsOptions, __filename, __dirname, staticPath;return _regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:


          // Determine Redis URL based on environment (dev or prod)
          redisUrl = process.env.REDISCLOUD_URL || 'redis://localhost:6379';
          redisClient = createClient({ url: redisUrl });

          console.log('redisUrl:', redisUrl);
          console.log('redisClient:', redisClient);

          // Connect to the Redis client
          _context2.prev = 4;_context2.next = 7;return (
            redisClient.connect());case 7:
          console.log('Connected to Redis');

          // Initialize RedisStore properly

          //  const RedisStore = new connectRedis(session); // connect-redis(express-session) 
          //  console.log('redisStore', redisStore); 

          // Initialize your Express app here
          app = express();
          // const RedisStore = connectRedis(session);
          // Configure the session store
          sessionStore = new RedisStore({ client: redisClient });
          console.log("sessionStore", sessionStore);

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
                httpOnly: true // Recommended for security
              }
            })
          );

          // Async function to test Redis connection
          testRedisConnection = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {var value;return _regeneratorRuntime.wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

                      redisClient.set('test_key', 'test_value'));case 3:_context.next = 5;return (
                      redisClient.get('test_key'));case 5:value = _context.sent;
                    console.log("Value from Redis: ".concat(value)); // Should output: test_value
                    _context.next = 12;break;case 9:_context.prev = 9;_context.t0 = _context["catch"](0);
                    console.error('Redis Operation Error', _context.t0);case 12:case "end":return _context.stop();}}, _callee, null, [[0, 9]]);}));return function testRedisConnection() {return _ref2.apply(this, arguments);};}();



          // Call the async function
          _context2.next = 15;return testRedisConnection();case 15:


          // Initialize Passport Library
          app.use(passport.initialize());
          app.use(passport.session());

          // Middleware
          // Parses inc req and attaches JSON to body parameter of the request object
          app.use(express.json());

          // Enables incoming requests from cors origin domains
          // CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. By specifying an exact origin, you allow requests only from that domain, while blocking others.
          // Good for using multi domains
          corsOptions = {
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
                clientID: config.oauth.googleClientId, //config/index.js 
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
          app.use("/auth", authRouter);

          // Serve static files from the React app (front end) __dirname
          __filename = fileURLToPath(import.meta.url);
          __dirname = dirname(__filename);
          staticPath = path.join(__dirname, "..", "../client/build");
          console.log("Serving static files from:", staticPath);
          app.use(express["static"](staticPath));

          // Handle GET all requests to serve the React app (front end)
          app.get("*", function (req, res) {
            res.sendFile(path.join(staticPath, "index.html"));
          });

          // Default Error handler middleware, place code at the bottom 
          app.use(errorHandler);

          // Bind the app to a specified port
          app.listen(config.port || 8080, function () {return (
              console.log("Server listening on port ".concat(config.port, "...")));}
          );_context2.next = 39;break;case 36:_context2.prev = 36;_context2.t0 = _context2["catch"](4);


          console.error('Redis Client Connection Error', _context2.t0);case 39:case "end":return _context2.stop();}}, _callee2, null, [[4, 36]]);}));return function startServer() {return _ref.apply(this, arguments);};}();



// Start the server
startServer();
//# sourceMappingURL=server.js.map