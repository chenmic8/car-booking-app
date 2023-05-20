import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import Logout from "./Logout";

const Navbar = () => {
  const { getToken } = useContext(LoadingContext);

  return (
    <nav>
      <NavLink to='/'>Home</NavLink>

      {/* PROTECTED NAV LINKS */}

      {!getToken() && (
        <>
          <NavLink to='/signup'>Sign up</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </>
      )}
      {getToken() && (
        <>
          <NavLink to='/cars'>Cars</NavLink>
          <NavLink to='/events'>Events</NavLink>
          <NavLink to='/new-event'>New Event</NavLink>
          <NavLink to='/profile'>Profile</NavLink>
          <Logout />
        </>
      )}
    </nav>
  );
};

export default Navbar;
