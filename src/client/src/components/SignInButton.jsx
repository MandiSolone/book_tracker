import React from "react";

const SignInButton = () => {
  return (
    <div>
      <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>
        <button>Sign In</button>
      </a>
    </div>
  );
};

export default SignInButton;
