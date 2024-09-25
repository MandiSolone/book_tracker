// controllers/auth.controller.js
import query from "../db/utils";

// Google OAuth callback function
export const googleAuthCallback = async (accessToken, refreshToken, profile, done) => {
    const userEmail = profile.emails[0].value;
    console.log("userEmail", userEmail);

    try {
        // Check if user exists
        const results = await query('SELECT * FROM users WHERE email = ?', [userEmail]);
        console.log("results", results); 

        if (results.length > 0) {
            return done(null, results[0]);
        } else {
            const newUser = { email: userEmail, name: profile.displayName };
            console.log("newUser", newUser); 
            await query('INSERT INTO users SET ?', newUser);
            const insertedUser = await query('SELECT * FROM users WHERE email = ?', [userEmail]);
            console.log("insertedUser", insertedUser); 
            return done(null, insertedUser[0]);
        }
    } catch (err) {
        return done(err);
    }
};

// Serialize and deserialize user functions
export const serializeUser = (user, done) => {
    done(null, user.id); // Use user.id to identify the user
    console.log("user.id",user.id);
};

export const deserializeUser = async (id, done) => {
    try {
        const user = await query('SELECT * FROM users WHERE id = ?', [id]);
        done(null, user[0]); // Pass the user object to the session
    } catch (err) {
        done(err);
    }
};
