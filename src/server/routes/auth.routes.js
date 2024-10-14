// Using Google OAuth to sign in 
import express from "express";
import passport from "passport";// Used Passport Library - middleware for handling authentication

const AuthRouter = express.Router();

const redirectUrl = process.env.CLIENT_URL || 'http://localhost:8080/'; // Use the environment variable

// Redirect to Google for authentication
AuthRouter.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    // prompt: 'select_account' // This will prompt the user to select an account each time they sign in 
}));

// Callback route for Google to redirect to
AuthRouter.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        console.log('google/callback Authenticated User:', req.user);
        if (!req.user){
            console.error('google/callback Authentication failed, no user returned.');
            return res.redirect('/'); // Redirect if authentication fails
        }
        console.log('google/callback User session:', {
            store: sessionStore,
            session: req.session, 
            passport: req.session.passport,
        }); // Log session data
        res.redirect(redirectUrl); // Redirect to the account/home page (Client side) after auth
    }
);

// User profile route
AuthRouter.get('/profile', async (req, res) => {
    console.log('/profile - Incoming request:', req.method, req.url);
    console.log('/profile - User Session:', req.session); // Log session info
    console.log('/profile - User Authenticated:', req.isAuthenticated()); // Log authentication status
    console.log('/profile - Session Data:', {
        userId: req.session.passport ? req.session.passport.user : null, // log user ID if available
        // Optionally log other non-sensitive data
    });

    if (req.isAuthenticated()) {
        console.log('/profile - Returning user data:', req.user); // Log user data
        res.json(req.user); // Return the authenticated user
    } else {
        console.warn('/profile - User not authenticated, sending 401 response');
        res.status(401).json({ message: 'User not authenticated' });
    }
});

// Logout endpoint
AuthRouter.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session = null; // Clear session data
        res.redirect('/loggedout'); // Redirect after logout
    });
});

export default AuthRouter;