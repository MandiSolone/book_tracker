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
          <p> <strong>Sign in to access your account and library.</strong></p>
          <br />
          <p>With our app, you can effortlessly keep track of all your books and their locations, ensuring you never lose track of your collection. Whether you have a sprawling library at home or a curated selection across different platforms, this app allows you to view all your books in one convenient place. Start by manually adding a book or quickly searching for one from our extensive database. Once added, you can easily update the storage location for each book, whether it’s on your bookshelf, in a friend's hands, or on a digital platform. Stay organized and take control of your reading journey, all while enjoying the simplicity of managing your literary treasures.</p>

          <SignInButton />
        </>
      )}
    </div>
    </>
  );
};
