import { Button } from "flowbite-react";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaBars,
  FaList,
  FaPen,
  FaPowerOff,
  FaUser,
} from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
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
    <div className="bg-dark-blue">
      <div className="flex py-6 z-10 w-[90%] mx-auto flex-row justify-between px-3  ">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-40 md:w-48"
              src="https://res.cloudinary.com/feyton/image/upload/v1681276152/updatez_drivetest_pro_logo_xzj5si.png"
              alt=" "
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-row gap-3">
          <Link to="/quiz">
            <Button
              className="outline-none appearance-none focus:outline-none"
              color={"info"}
              size="xs"
            >
              <FaArrowRight className="mr-2" />
              Ibizamini
            </Button>
          </Link>
          <Link to="/add">
            <Button size={"xs"}>
              <FaPen className="mr-2" />
              Tanga Ikibazo
            </Button>
          </Link>
          <CheckRole roles={["admin", "super", "editor"]}>
            <Link to="/questions">
              <Button size={"xs"}>
                <FaList className="mr-2" /> Ibibazo
              </Button>
            </Link>
          </CheckRole>

          {authenticated ? (
            <>
              <Link onClick={() => setMenuOpen(false)} to="/profile">
                <Button size={"xs"} color="success">
                  <FaUser className="mr-1" /> {user?.user?.name.split(" ")[0]}
                </Button>
              </Link>
              <Button
                onClick={() => handleLogout()}
                size={"xs"}
                color={"failure"}
              >
                <FaPowerOff className="mr-2" />
                Sohoka
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size={"xs"} color="success">
                  <FaUser className="mr-2" /> Injira
                </Button>
              </Link>
              <Link to="/register">
                <Button size={"xs"} color="success">
                  <FaArrowRight className="mr-2" /> Iyandikishe
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primary text-2xl focus:outline-none"
          >
            {menuOpen ? <HiOutlineX /> : <FaBars />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-10 bg-gray-100 w-full z-20 px-4">
            <div className="flex flex-col gap-3 p-3">
              <Link to="/quiz" onClick={() => setMenuOpen(false)}>
                <Button size={"xs"} className="w-full">
                  <FaArrowRight className="mr-2" /> Ibizamini
                </Button>
              </Link>
              <Link to="/add" onClick={() => setMenuOpen(false)}>
                <Button size={"xs"} className="w-full">
                  <FaPen className="mr-2" />
                  Tanga Ikibazo
                </Button>
              </Link>
              <CheckRole roles={["admin", "super", "editor"]}>
                <Link to="/questions" onClick={() => setMenuOpen(false)}>
                  <Button size={"xs"} className="w-full">
                    <FaList className="mr-2" /> Ibibazo
                  </Button>
                </Link>
              </CheckRole>

              {authenticated ? (
                <>
                  <Link onClick={() => setMenuOpen(false)} to="/profile">
                    <Button className="w-full" size={"xs"} color="success">
                      <FaUser className="mr-1" />{" "}
                      {user?.user?.name.split(" ")[0]}
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    size={"xs"}
                    color={"failure"}
                  >
                    <FaPowerOff className="mr-2" />
                    Sohoka
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button size={"xs"} color="success">
                      <FaUser className="mr-2" /> Injira
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size={"xs"} color="success">
                      <FaArrowRight className="mr-2" /> Iyandikishe
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
