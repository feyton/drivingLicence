import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark-blue text-primary-white mt-auto">
      <div className="w-[90%] max-w-[1560px] mx-auto">
        <div className="py-4">
          <div className="flex gap-7 md:items-center justify-between w-full flex-col md:flex-row md:text-left">
            <Link to={"/"}>
              <img
                className="w-40 md:w-48 mx-auto md:mx-0"
                src="https://res.cloudinary.com/feyton/image/upload/v1680981055/drivetestpro_logo_gxnshf.png"
                alt="DriveTest Logo"
              />
            </Link>

            <div className="m-3  px-5 rounded inline-block text-white">
              <ul className="flex flex-wrap gap-4">
                <li>©2023 DriveTestPro</li>
                <li className="list-dot">
                  <Link className="hover:text-gray-300" to="/terms">
                    Terms
                  </Link>
                </li>
                <li className="list-dot">
                  <Link className="hover:text-gray-300" to="/privacy">
                    Privacy policy
                  </Link>
                </li>

                <li className="list-dot">
                  <Link className="hover:text-gray-300" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
