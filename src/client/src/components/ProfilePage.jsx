//change from context to hook
import React, { useContext } from 'react';
import { UserProfileContext } from '../contexts/UserProfileContext'; // Import the context

const ProfilePage = () => {
  const { user, logout } = useContext(UserProfileContext); // Access user from context

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
