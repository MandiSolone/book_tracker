// contexts/UserProfileContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback (async () => {
    if (user) {
      return; // User already exists, no need to fetch
    }
    setLoading(true);
    setError(null);
      try {
        const response = await fetch('http://localhost:8080/api/auth/profile', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log(loading); 
          console.log(error); 
        } else {
          setUser(null); // Clear user if not authenticated
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError("Failed to load User. Please try again later.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    }, [user, loading, error]);

  useEffect(() => {
    fetchUser();// FetchUser when the component mounts
  }, [fetchUser]);

  const logout = async () => {
    // Call your logout endpoint
    await fetch('http://localhost:8080/api/auth/logout', { credentials: 'include', method: 'POST' });
    setUser(null);
    window.location.reload(); // Refresh the page
  };

  return (
    <UserProfileContext.Provider value={{ user, setUser, logout, loading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};


 