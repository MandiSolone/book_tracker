import { NavLink, Link } from "react-router-dom";
import React from "react";

function NavBar (){
return(
<nav className="nav-bar">
  <ul>
    <li>
       <Link to="/">Home</Link>
      {/* need to add CSS styling to use the below}
      {/* <NavLink
        className={({ isActive }) => (isActive ? "active" : null)}
        to="/">
        Home
       </NavLink> */}
    </li>
    <li>
          <Link to="/library">Library</Link>
    </li>
  </ul>
</nav>
);
}

export default NavBar; 
