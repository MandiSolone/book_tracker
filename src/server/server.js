import express from "express";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes/index";
import config from "./config";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

/**
 * Parses incoming request body as json if header indicates application/json
 * Middlewear that parses incoming request data to JSON
 *  Attaches JSON to body parameter of the request object
 */
app.use(express.json());

/**
 * Enables incoming requests from cross origin domains
 */
app.use(cors());

/**
 * Logs incoming request information to the dev console
 * http request logger middleware for Node.js used with Express.js, it logs url, resp, req
 */
app.use(morgan("dev"));

/**
 * Directs all routes starting with /api to the top level api express router
 * Uses the imported apiRouter to handle all requests
 */
// http://localhost:8080/api/...
app.use("/api", apiRouter);

/**
 * Directs incoming static asset requests to the public folder
 */

// app.use(express.static(join(__dirname, "../client/build")));

/**
 * Sends the react app index.html for page requests
 * Only needed in production when you are not using the react dev server
 */

// app.use((req, res, next) => {
//   try {
//     res.sendFile(join(__dirname, "../client/build/index.html"));
//   } catch (error) {
//     next(error);
//   }
// });

/**
 * Default Error handler middleware
 */
app.use(errorHandler);

/**
 * Bind the app to a specified port
 * You can access your app at http://localhost:<port>
 */
app.listen(config.port || 8080, () =>
  console.log(`Server listening on port ${config.port}...`)
);
