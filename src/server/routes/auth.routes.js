// Using Google OAuth to sign in 
import express from "express";
import passport from "passport";

const AuthRouter = express.Router();

// Redirect to Google for authentication
AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google to redirect to
AuthRouter.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        console.log("User authenticated successfully:", req.user); // Add this line
        res.redirect('http://localhost:3000/account'); // Redirect to the profile page after authentication
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
        res.redirect('/loggedout'); // Redirect after logout
    });
});

export default AuthRouter;