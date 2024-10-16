// Using Google OAuth to sign in
import express from "express";
import passport from "passport"; // Used Passport Library - middleware for handling authentication

const AuthRouter = express.Router();

const redirectUrl = process.env.CLIENT_URL || "http://localhost:8080/"; // Use the environment variable

// Redirect to Google for authentication
AuthRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route for Google to redirect to
AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    if (!req.user) {
      console.error("google/callback Authentication failed, no user returned.");
      return res.redirect("/"); // Redirect if authentication fails
    }

    res.redirect(redirectUrl); // Redirect to the account/home page (Client side) after auth
  }
);

// User profile route
AuthRouter.get("/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user); // Return the authenticated user
  } else {
    console.warn("/profile - User not authenticated, sending 401 response");
    res.status(401).json({ message: "User not authenticated" });
  }
});

// Logout endpoint
AuthRouter.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session = null; // Clear session data
    res.redirect("/loggedout"); // Redirect after logout
  });
});

export default AuthRouter;
