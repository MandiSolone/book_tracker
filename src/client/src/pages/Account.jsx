import React from "react";
import ProfilePage from "../components/ProfilePage.jsx"
import SignInButton from "../components/SignInButton.jsx";
import useUser from "../hooks/useUser.js";

export default function Account() {
  const { user } = useUser();//Call the user profile hook 

  return (
    <div>
      <h1>Account</h1>
      {user ? <ProfilePage /> : <SignInButton />}
    </div>
  );
}