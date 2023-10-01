import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-red-500">
      <h1>Home</h1>
      <Link to="/">Home</Link>
      <Link to="/register">Sign Up</Link> <br />
      <Link to="/login">Log In</Link>
      <Link to="/user">User</Link>
    </div>
  );
}

export default Navbar;
