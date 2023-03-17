import React from "react";
import { FaEye, FaHome, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/reducers/authReducer";

function Navbar(props) {
  const { authenticated, user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="flex flex-row justify-between px-3 py-1">
      <div className="flex flex-row gap-3">
        <Link to="/" className="button-primary">
          <FaHome />
        </Link>
        <Link to="/quiz" className="button-primary">
          Take Quiz
        </Link>
        <Link to="/add" className="button-primary">
          Add Question
        </Link>
        <Link to="/questions" className="button-primary">
          Questions
        </Link>
        {authenticated ? (
          <>
            <button className="button-primary">
              <FaUser /> {user?.user?.name.split(" ")[0]}
            </button>
            <button
              onClick={() => handleLogout()}
              className="button-primary text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="button-primary">
              Login
            </Link>
            <Link to="/register" className="button-primary">
              Register
            </Link>
          </>
        )}
      </div>
      <form action="" className="flex flex-row relative">
        <input
          type="text"
          placeholder="Search"
          className="h-7 outline-none focus:outline-none focus:ring-0  rounded-md min-w-[200px] top-0 left-0 w-full text-xs "
        />
        <button className="absolute right-0 px-3 bg-gray-300 h-full rounded-r-md border-t border-b border-r border-black">
          <FaEye />{" "}
        </button>
      </form>
    </div>
  );
}

export default Navbar;
