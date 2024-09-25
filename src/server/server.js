import express from "express";
import morgan from "morgan"; // For logging
import cors from "cors";
import apiRouter from "./routes/index"; // Aggregated routes 
import config from "./config"; // the config file
import { errorHandler } from "./middlewares/errorHandler";
//OAuth
import authRouter from "./routes/auth.routes"; // Import the new auth routes
import passport from "passport"; // did in auth.routes
import session from "express-session"; 
import { googleAuthCallback, serializeUser, deserializeUser } from "./controllers/auth.controller";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; 

const app = express();

// OAuth Set up session middleware
//Has to be at the top, before initalizing Passport and defining any routes 
app.use(session({
  secret: config.oauth.sessionSecret, // Use your session secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true in production if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
// Parses inc req and attaches JSON to body parameter of the request object
app.use(express.json()); 

// Enables incoming requests from cors origin domains
//CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. By specifying an exact origin, you allow requests only from that domain, while blocking others.
const corsOptions = {
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true, // Allow credentials to be sent
};
app.use(cors(corsOptions)); 

// Logs incoming request information to the dev console (url, resp, req)
app.use(morgan("dev"));

// Passport configuration for Google OAuth
passport.use(new GoogleStrategy({
  clientID: config.oauth.googleClientId,
  clientSecret: config.oauth.googleClientSecret,
  callbackURL: "http://localhost:8080/api/auth/google/callback",
}, googleAuthCallback));

// Serialize and deserialize user
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser); 

//Directs all routes starting with /api to the top level api express router http://localhost:8080/api/...
app.use("/api", apiRouter); 
// Attach the auth router
app.use(authRouter); 
//Default Error handler middleware
app.use(errorHandler); 

// Bind the app to a specified port
//You can access your app at http://localhost:<port>
app.listen(config.port || 8080, () =>
  console.log(`Server listening on port ${config.port}...`)
);

// In dev create-react-app's built in server handles these routes (everything) but in deployment you need these to ensure app can serve static files and client-side routing works correctly 

// /**
//  * Directs incoming static asset requests to the public folder
//  */

// app.use(express.static(join(__dirname, "../client/build")));

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

