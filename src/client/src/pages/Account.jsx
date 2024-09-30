import React from "react";
import ProfilePage from "../components/ProfilePage.jsx";
import SignInButton from "../components/SignInButton.jsx";
import useUser from "../hooks/useUser.js";

export default function Account() {
  const { user } = useUser(); //Call the user profile hook

  return (
    <div>
      <h1>Account</h1>
      {user ? (
        <ProfilePage />
      ) : (
        <>
          <h2>Welcome Back!</h2>
          <p>Sign in to access your account and library.</p>
          <SignInButton />
        </>
      )}
    </div>
  );
};
