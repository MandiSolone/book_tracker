// A Node.js package depenecy that needs to be instaled
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Create __filename and __dirname equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Heroku automatically sets NODE_ENV=production by default
// If not production then dev and - First, try to load .env from one server
if (process.env.NODE_ENV !== "production") {
  const primaryPath = path.join(__dirname, "..", ".env");
  const primaryEnvFound = dotenv.config({ path: primaryPath });

  // If that directory doesn't work, go two up from directory to start from server/dist
  if (primaryEnvFound.error) {
    const fallbackPath = path.join(__dirname, "..", "..", ".env");
    const fallbackEnvFound = dotenv.config({ path: fallbackPath });

    if (fallbackEnvFound.error) {
      throw new Error("Couldn't find .env file!");
    }
  }
}

export default {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
  },
  port: parseInt(process.env.PORT) || 3000,

  oauth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
  },
};
