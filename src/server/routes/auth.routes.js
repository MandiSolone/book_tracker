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
        console.log('Authenticated User:', req.user);
        res.redirect(redirectUrl); // Redirect to the account/home page (Client side) after auth
    }
);

// User profile route
AuthRouter.get('/profile', async (req, res) => {
    console.log('User Session:', req.session); // Log the session info
    console.log('User Authenticated:', req.isAuthenticated()); // Log authentication status
    if (req.isAuthenticated()) {
        res.json(req.user); // Return the authenticated user
    } else {
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