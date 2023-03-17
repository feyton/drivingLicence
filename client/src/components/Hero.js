import { Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Hero(props) {
  const { user } = useSelector((state) => state?.auth);
  return (
    <div className="hero">
      <div className="hero w-full min-h-full flex flex-col justify-center grow items-center ">
        <div className="">
          <div className="flex h-full flex-col items-center justify-start  w-full px-4 py-2">
            <h1 className="mt-28 sm:mt-20 text-2xl sm:text-4xl md:pl-10 md:text-6xl font-bold text-white dark:text-dark-text-fill font-lexend text-center md:text-left">
              Murakaza neza
            </h1>
            <p className="text-2xl md:text-4xl lg:text-3xl mt-8 md:mt-8 lg:mt-8 w-full sm:w-3/4 md:w-4/5 lg:w-full md:px-0 lg:px-8 text-white dark:text-dark-text-fill font-sans text-center">
              Aho wakimenyereza:
              <em>
                <b> Ukihugura ➡️ </b>
              </em>
              <em>
                <b> Ugatsinda</b>
              </em>
            </p>
            {!user?.auth ? (
              <div className="w-full text-center justify-center items-center mt-8">
                <Link to="quiz" className="justify-center mx-auto">
                  <Button
                    variant="primary"
                    className="px-4 py-0 mx-auto font-lexend"
                    size="lg"
                  >
                    Tangira
                  </Button>
                </Link>
              </div>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
