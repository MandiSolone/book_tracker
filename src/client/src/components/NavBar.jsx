import React, { useContext } from "react";
import style from "./NavBar.module.css";
import GoogleBookSearch from "./GoogleBookSearch";
import SignInButton from "./SignInButton";
import { UserProfileContext } from "../contexts/UserProfileContext"; // Import the context
import alertIcon from "../images/notifications.png";
import { Link } from "react-router-dom";

function NavBar() {
  const { user, logout } = useContext(UserProfileContext); // Access user and logout

  return (
    <nav className={style.navbar}>
      <div className={style.navbarContent}>
        <div className={style.welcomeContainer}>
          <div className={style.welcomeContent}>
            {user ? (
              <>
                <span>Welcome, {user.name}</span>
                <button onClick={logout}>Log Out</button>
              </>
            ) : (
              <SignInButton />
            )}
          </div>
          <div className={style.alertIcon}>
            <Link to="/account">
              <img src={alertIcon} alt="Alert" />
            </Link>
          </div>
        </div>
        <div className={style.fullWidth}>
          <GoogleBookSearch />
        </div>
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
