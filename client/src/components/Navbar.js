import React, { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/reducers/authReducer";
import CheckRole from "../utils/CheckRole";

function Navbar() {
  const { authenticated, user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-row justify-between px-3 py-1 md:py-2">
      <div className="flex items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-primary">
          Permit
        </Link>
      </div>

      <div className="hidden md:flex flex-row gap-3">
        <Link to="/quiz" className="button-primary">
          Kora ikizamini
        </Link>
        <Link to="/add" className="button-primary">
          Tanga Ikibazo
        </Link>
        <CheckRole roles={["admin", "super", "editor"]}>
          <Link to="/questions" className="button-primary">
            Ibibazo
          </Link>
        </CheckRole>

        {authenticated ? (
          <>
            <Link
              className="button-primary"
              onClick={() => setMenuOpen(false)}
              to="/profile"
            >
              <FaUser /> {user?.user?.name.split(" ")[0]}
            </Link>
            <button
              onClick={() => handleLogout()}
              className="button-primary text-red-500"
            >
              Sohoka
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="button-primary">
              Injira
            </Link>
            <Link to="/register" className="button-primary">
              Iyandikishe
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-primary text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-10 bg-gray-100 w-full">
          <div className="flex flex-col gap-3 p-3">
            <Link
              to="/quiz"
              className="button-primary"
              onClick={() => setMenuOpen(false)}
            >
              Kora ikizamini
            </Link>
            <Link
              to="/add"
              className="button-primary"
              onClick={() => setMenuOpen(false)}
            >
              Tanga Ikibazo
            </Link>
            <CheckRole roles={["admin", "super", "editor"]}>
              <Link
                to="/questions"
                className="button-primary"
                onClick={() => setMenuOpen(false)}
              >
                Ibibazo
              </Link>
            </CheckRole>

            {authenticated ? (
              <>
                <Link
                  className="button-primary"
                  onClick={() => setMenuOpen(false)}
                  to="/profile"
                >
                  <FaUser /> {user?.user?.name.split(" ")[0]}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="button-primary text-red-400"
                >
                  Sohoka
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="button-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Injira
                </Link>
                <Link
                  to="/register"
                  className="button-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Iyandikishe
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
