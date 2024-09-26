import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useUser();
  console.log("ProtectedRoute - User:", user); // Log the user in ProtectedRoute

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
