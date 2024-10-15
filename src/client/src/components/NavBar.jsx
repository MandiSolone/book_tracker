import React, { useContext } from "react";
import style from "./NavBar.module.css";
import GoogleBookSearch from "./GoogleBookSearch";
import SignInButton from "./SignInButton";
import { UserProfileContext } from "../contexts/UserProfileContext"; // Import the context

function NavBar() {
  const { user, logout } = useContext(UserProfileContext); // Access user and logout

  return (
    <nav className={style.navbar}>
      <div className={style.nav}>
        {user ? (
          <div>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Log Out</button>
          </div>
        ) : (
          <SignInButton />
        )}

        <GoogleBookSearch className={style.fullWidth} />
        <div className={style.linkContainer}>
          <a href="/">Account</a>
          <a href="/library">Library</a>
          <a href="/addbook">Add Book</a>
          <a href="/wishlist">Wishlist</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
