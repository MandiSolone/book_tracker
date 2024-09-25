import React from 'react';

const SignInButton = () => {
  const handleSignIn = () => {
    window.location.href = 'http://localhost:8080/api/auth/google';
  };

  return <button onClick={handleSignIn}>Sign in</button>;
};

export default SignInButton;