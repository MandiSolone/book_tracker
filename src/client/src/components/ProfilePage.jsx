import React, { useContext } from "react";
import { UserProfileContext } from "../contexts/UserProfileContext"; // Import the context


const ProfilePage = () => {
  const { user, logout } = useContext(UserProfileContext); // Access user from context

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: <strong>{user.email}</strong></p>
          <br />
          <p>With our app, you can effortlessly keep track of all your books and their locations, ensuring you never lose track of your collection. Whether you have a sprawling library at home or a curated selection across different platforms, this app allows you to view all your books in one convenient place. Start by manually adding a book or quickly searching for one from our extensive database. Once added, you can easily update the storage location for each book, whether it’s on your bookshelf, in a friend's hands, or on a digital platform. Stay organized and take control of your reading journey, all while enjoying the simplicity of managing your literary treasures.</p>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
