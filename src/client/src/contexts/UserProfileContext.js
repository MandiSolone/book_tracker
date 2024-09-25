// contexts/UserProfileContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
      try {
        const response = await fetch('http://localhost:8080/api/auth/profile', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("user", user); 
        } else {
          setUser(null); // Clear user if not authenticated
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError("Failed to load User. Please try again later.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

  useEffect(() => {
    fetchUser();// FetchUser when the component mounts
  }, []);

  const logout = async () => {
    // Call your logout endpoint
    await fetch('http://localhost:8080/api/auth/logout', { credentials: 'include', method: 'POST' });
    setUser(null);
  };

  return (
    <UserProfileContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserProfileContext.Provider>
  );
};

