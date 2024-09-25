import express from "express";
import passport from "passport";

const router = express.Router();

// Redirect to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google to redirect to
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        console.log("User authenticated successfully:", req.user); // Add this line
        res.redirect('/api/success'); // Change this to your desired route
    }
);

export default router;