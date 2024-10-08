// query is mySQL db (local-dev or clear-heroku-production) 
// sending commands from google oauth to user table during sing in
import query from "../db/utils.js";

// Google OAuth callback function
export const googleAuthCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const userEmail = profile.emails[0].value;

  try {
    // Check if user exists
    const results = await query("SELECT * FROM users WHERE email = ?", [
      userEmail,
    ]);

    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      const newUser = { email: userEmail, name: profile.displayName };
      await query("INSERT INTO users SET ?", newUser);
      const insertedUser = await query("SELECT * FROM users WHERE email = ?", [
        userEmail,
      ]);
      return done(null, insertedUser[0]);
    }
  } catch (err) {
    return done(err);
  }
};

// Serialize and deserialize user functions exported
export const serializeUser = (user, done) => {
  console.log('Serializing user:', user); // Log user info being serialized
  done(null, user.id); // Use user.id to identify the user
};

export const deserializeUser = async (id, done) => {
  console.log('Deserializing user with ID:', id); // Log ID being deserialized
  try {
    const user = await query("SELECT * FROM users WHERE id = ?", [id]);
    console.log('Deserializing user:', user[0]); // Log user info being deserialized
    done(null, user[0]); // Pass the user object to the session
  } catch (err) {
    console.error('Database Error:', err); // Log error for debugging
    done(err);
  }
};