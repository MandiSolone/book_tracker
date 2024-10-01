// Using Google OAuth to sign in 
// Used Passport Library - middleware for handling authentication
import express from "express";
import passport from "passport";


const AuthRouter = express.Router();

// Redirect to Google for authentication
AuthRouter.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    // This will prompt the user to select an account each time they sign in 
    // prompt: 'select_account' 
}));
// AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google to redirect to
AuthRouter.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        res.redirect('http://localhost:3000/account'); // Redirect to the profile page (Client side) after authentication
    }
);

// User profile route
AuthRouter.get('/profile', async (req, res) => {
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
        // Clear any additional session data if needed
        req.session = null; // Clear session data
        res.redirect('/loggedout'); // Redirect after logout
    });
});

export default AuthRouter;