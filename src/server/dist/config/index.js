//A Node.js package depenecy that needs to be instaled
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from "path";

// Create __filename and __dirname equivalents
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);

// First, try to load .env from one directory up
var primaryPath = path.join(__dirname, "..", ".env");
var primaryEnvFound = dotenv.config({ path: primaryPath });

if (primaryEnvFound.error) {
  // If the first attempt fails, try loading from two directories up
  var fallbackPath = path.join(__dirname, "..", "..", ".env");
  var fallbackEnvFound = dotenv.config({ path: fallbackPath });

  if (fallbackEnvFound.error) {
    throw new Error("Couldn't find .env file!");
  }
}

// exports configuration
export default {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
  },
  port: parseInt(process.env.PORT),
  oauth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET
  }
};
//# sourceMappingURL=index.js.map