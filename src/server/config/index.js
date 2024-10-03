//A Node.js package depenecy that needs to be instaled
import dotenv from "dotenv";

// Load environment variables
// const envFound = dotenv.config();
// if (!envFound) {
//   throw new Error("Couldn't find .env!");
// }
//Load env var from the .env file in the server directory 
import path from "path";

// Load environment variables from the .env file in the server directory
const envFound = dotenv.config({ path: path.join(__dirname, '..', '.env') });
if (envFound.error) {
    throw new Error("Couldn't find .env!");
}

// exports configuration
export default {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
  },
  port: parseInt(process.env.PORT),
  oauth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
  },
};
