import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../serviceAPI/jsonServerApi";

import logo from "../../assets/paau_market.png";

import { authenticated } from "../authenticationSlice";
import { addProductPhoneNumber } from "../features/products/productPhoneNumberSlice";

function Navbar() {
  const sideBar = useRef(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  function onCancelButtonHandler() {
    const sideBarClasses = sideBar.current.classList;
    sideBarClasses.forEach((className) => {
      if (className === "left-0") {
        sideBarClasses.remove("left-0");
        sideBarClasses.add("-left-3/4");
      }
    });
  }

  function onMenuButtonHandler() {
    const sideBarClasses = sideBar.current.classList;
    sideBarClasses.forEach((className) => {
      if (className === "-left-3/4") {
        sideBarClasses.remove("-left-3/4");
        sideBarClasses.add("left-0");
      }
    });
  }

  async function onLogoutHandler() {
    const {
      data: { isLoggedIn, user },
    } = await logout();

    if (!isLoggedIn) {
      dispatch(
        authenticated({
          isLoggedIn: isLoggedIn,
          info: user,
        })
      );

      dispatch(addProductPhoneNumber([]));

      const sideBarClasses = sideBar.current.classList;
      sideBarClasses.forEach((className) => {
        if (className === "left-0") {
          sideBarClasses.remove("left-0");
          sideBarClasses.add("-left-3/4");
        }
      });
    }
  }

  return (
    <header className="flex py-5 items-center">
      <section className="flex items-center flex-grow">
        <article>
          <button
            onClick={onMenuButtonHandler}
            className="md:hidden cursor-pointer"
          >
            <Icon className="text-xl" icon="basil:menu-outline" />
          </button>

          <div
            ref={sideBar}
            className="transition-all duration-500 delay-150 ease-in-out py-5 px-10 bg-white fixed -left-3/4 top-0 z-10 h-full w-[65%] shadow-lg text-sm"
          >
            <div className="pb-20 flex justify-end">
              <button
                onClick={onCancelButtonHandler}
                className="hover:bg-mantis-50 text-mantis-900 p-2 rounded-full"
              >
                <Icon className="text-xl" icon="iconoir:cancel" />
              </button>
            </div>

            <article className="text-mantis-900 font-bold">
              <div>
                <Link
                  className="block hover:bg-mantis-50 p-3 rounded-full"
                  to="/"
                >
                  Home
                </Link>
              </div>
              <div>
                {isLoggedIn ? (
                  <button
                    onClick={onLogoutHandler}
                    className="block w-full text-left hover:bg-mantis-50 p-3 rounded-full"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    className="block hover:bg-mantis-50 p-3 rounded-full"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </article>
          </div>
        </article>

        <Link to="/" className="px-2">
          <img
            src={logo}
            alt="Paau Market Logo"
            loading="lazy"
            className="w-8 hidden md:block"
          />
        </Link>
        <h1 className="font-bold text-center md:text-left flex-grow text-mantis-900">
          <Link to="/">Paau Market</Link>
        </h1>
      </section>

      <section className="flex text-sm space-x-5">
        <Link to="/user" className="flex items-center space-x-2">
          <Icon className="text-xl text-mantis-900" icon="codicon:account" />
          <span className="hidden md:block font-bold text-mantis-900">
            Account
          </span>
        </Link>

        <div className="hidden md:block">
          {isLoggedIn ? (
            <button
              onClick={onLogoutHandler}
              className="flex items-center space-x-2"
            >
              <Icon
                className="text-xl text-mantis-900"
                icon="material-symbols:logout"
              />
              <span className="font-bold text-mantis-900">Logout</span>
            </button>
          ) : (
            <Link
              className="font-bold flex items-center space-x-2 hover:bg-mantis-50 p-3 rounded-full"
              to="/login"
            >
              <Icon
                icon="material-symbols:login"
                className="text-xl text-mantis-900"
              />
              <span className="font-bold text-mantis-900">LogIn</span>
            </Link>
          )}
        </div>
      </section>
    </header>
  );
}

export default Navbar;
{
  /* <div>
    <h1>Home</h1>
    <Link to="/">Home</Link>
    <Link to="/register">Sign Up</Link> <br />
    <Link to="/login">Log In</Link>
    <Link to="/user">User</Link>
  </div> */
}
