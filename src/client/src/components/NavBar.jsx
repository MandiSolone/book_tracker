//Update with NavLink?
import React from "react";
import style from "./NavBar.module.css";
import GoogleBookSearch from "./GoogleBookSearch";

function NavBar() {
  return (
    <nav className={style.navbar}>
      <div className={style.nav}>
        <GoogleBookSearch className={style.fullWidth} />
        <div className={style.linkContainer}>
          <a href="/">Library</a>
          <a href="/addbook">Add Book</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/account">Account</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
