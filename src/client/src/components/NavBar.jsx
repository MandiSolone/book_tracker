//Update with NavLink
import React from "react";

function NavBar() {
  return (
    <nav className="nav-bar">
      <a href="/">Library</a>
      <a href="/addbook">AddBook</a>
      <a href="/wishlist">Wishlist</a>
      <a href="/account">Account</a>
    </nav>
  );
}

export default NavBar;
