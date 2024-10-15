import React from "react";
import ProfilePage from "../components/ProfilePage.jsx";
import SignInButton from "../components/SignInButton.jsx";
import useUser from "../hooks/useUser.js";


export default function Account() {
  const { user } = useUser(); //Call the user profile hook

  return (
    <>
    <h1>Account</h1>

    <div className="login">
      {user ? (
        <ProfilePage />
      ) : (
        <>
          <h3>Welcome Back!</h3>
          <p>Sign in to access your account and library.</p>
          <SignInButton />
        </>
      )}
    </div>
    </>
  );
};
