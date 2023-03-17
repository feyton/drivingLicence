import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar(props) {
  const { setIsOpen } = props;
  return (
    <div className="flex flex-row justify-between px-3 py-1">
      <div className="flex flex-row gap-3">
        <Link to="/quiz" className="button-primary">
          Take Quiz
        </Link>
        <Link to="/add" className="button-primary">
          Add Question
        </Link>
        <Link to="/questions" className="button-primary">
          Questions
        </Link>
        <button onClick={() => setIsOpen(true)} className="button-primary">
          Login
        </button>
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
