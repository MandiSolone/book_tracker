import { Link } from "react-router-dom";
// import { NavLink, Link } from "react-router-dom";
import React from "react";

      // {/* need to add CSS styling to use the below}
      // {/* <NavLink
      //   className={({ isActive }) => (isActive ? "active" : null)}
      //   to="/">
      //   Home
      //  </NavLink> */}

function NavBar (){
return(
<nav className="nav-bar">
  <ul>
    <li>
    <Link to="/">HOME</Link>
    </li>
    <li>
    <Link to="/library">LIBRARY</Link>
    </li>
    <li>
    <Link to="/wishlist">WISHLIST</Link>
    </li>
    <li>
          <Link to="/account">ACCOUNT</Link>
    </li>
  </ul>
</nav>
);
}

export default NavBar; 
