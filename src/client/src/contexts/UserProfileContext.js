import React, { createContext, useState, useEffect, useCallback } from "react";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (user) {
      return; // If user already exists, no need to fetch
    }

    setLoading(true);
    setError(null);

    try {

      const response = await fetch ((`${process.env.REACT_APP_API_URL}/auth/profile`),{
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null); // Clear user if not authenticated
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to load User. Please try again later.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  }, [user]);

  useEffect(() => {
    fetchUser(); // FetchUser when the component mounts
  }, [fetchUser]);

  // Call logout endpoint
  // When a user logs out, any session cookies or local storage entries are cleared.
  const logout = async () => {
    await fetch ((`${process.env.REACT_APP_API_URL}/auth/logout`), {
      credentials: "include",
      method: "POST",
    });
    setUser(null);
    // Clear cookies or local storage if needed
    // e.g., document.cookie.split(";").forEach(c => { document.cookie = c.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.localStorage.clear(); // Clear local storage if you store tokens there
    window.location.reload(); // Refresh the page
  };

  return (
    <UserProfileContext.Provider
      value={{ user, setUser, logout, loading, error }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
