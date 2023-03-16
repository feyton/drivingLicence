import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Iyi paji ntibaho</p>
      <Link to={"/"}>Ahabanza</Link>
    </div>
  );
}

export default NotFound;
