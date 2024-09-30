import React from "react";

const SignInButton = () => {
  return (
    <div>
      <a href="http://localhost:8080/api/auth/google">
        <button>Sign In with Google</button>
      </a>
    </div>
  );
};

export default SignInButton;
