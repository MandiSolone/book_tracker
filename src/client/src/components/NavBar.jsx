import React from "react";
// import { Link } from "react-router-dom";
// import { NavLink, Link } from "react-router-dom";
// {/* need to add CSS styling to use the below}
// {/* <NavLink
//   className={({ isActive }) => (isActive ? "active" : null)}
//   to="/">
//   Home
//  </NavLink> */}

function NavBar() {
  return (
    <nav className="nav-bar">
  <a href="/">Library</a>
  <a href="/search">Search</a>
  <a href="/wishlist">Wishlist</a>
  <a href="/account">Account</a>
    </nav>
  );
}

export default NavBar;
