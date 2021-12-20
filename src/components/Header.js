import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {Link, NavLink} from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../Styles/Header.css";

function Header({setUserInfo}) {
  const [cookies, setCookie, removeCookies] = useCookies(["token"]);

  const [listMenu, setListMenu] = useState(["Home", "Job", "Contact"]);

  const [user, setUser] = useState({});

  const [navMenu, setNavMenu] = useState(false);

  console.log(user);
  useEffect(() => {
    console.log(cookies.user);
    if (cookies.user !== null) {
      fetch(`${process.env.REACT_APP_API_URL}/login?api_token=${cookies.user}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUserInfo(data);
            setUser(data.user_info);
            console.log("check", data);
            if (data.role_level === 0) {
              setListMenu(["Home", "Job", "Quiz Test", "Contact"]);
            } else if (data.role_level === 1) {
              setListMenu(["Home", "Job", "Contact", "For Recruiter"]);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [cookies.user]);

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout?api_token=${cookies.user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          removeCookies("user");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <header>
      <div className="bg-[#1e1e1e] bg-opacity-10">
        <div className="container flex justify-between items-center flex-wrap text-sm">
          <div className="max-w-full lg:max-w-[50%] flex">
            <div className="py-5 px-2.5 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (+84) 123 456 789
            </div>
            <div className="inline-flex items-center py-5 px-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a href="mailto:support@cvtojob.tk">support@cvtojob.tk</a>
            </div>
          </div>
        </div>
      </div>
      <div className="top-0 left-0 right-0 my-3">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  className="md:max-w-[200px] max-w-[90px] h-auto mr-2"
                />
              </Link>
            </div>
            <nav className="md:block hidden">
              <ul className="w-full flex items-center justify-center">
                {listMenu.length > 0 &&
                  listMenu.map((item, index) => (
                    <li
                      key={index}
                      className={`inline-block  mx-2  transition-all duration-150
                      ${
                        item.replace(/\s/g, "-").toLowerCase() ===
                        "for-recruiter"
                          ? ""
                          : "py-3 px-2.5"
                      }`}
                    >
                      <NavLink
                        className="hover:text-prihover"
                        activeClassName={`${
                          item.replace(/\s/g, "-").toLowerCase() ===
                          "for-recruiter"
                            ? "py-2 px-3 bg-blue-500  rounded-lg border border-blue-500 hover:bg-white font-bold text-white"
                            : "text-indigo-600"
                        }`}
                        to={`/${item.replace(/\s/g, "-").toLowerCase()}`}
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </nav>
            <div className="md:block hidden max-w-full lg:max-w-[50%]">
              {!cookies.user ? (
                <>
                  <div className="inline-block py-3 px-2.5">
                    <Link to="/login" className="hover:text-indigo-600">
                      Login
                    </Link>
                  </div>
                  <span>or</span>
                  <div className="inline-block py-3 px-2.5">
                    <Link
                      className="border border-prihover rounded-md py-2 px-3 bg-indigo-600 text-white hover:bg-white hover:text-black"
                      to="/register"
                    >
                      Signup
                    </Link>
                  </div>
                </>
              ) : (
                <div className=" ">
                  <div className="flex items-center justify-between relative toggle_profile">
                    <img
                      src={
                        user.logo_url
                          ? user.logo_url
                          : "https://picsum.photos/200"
                      }
                      alt={user.full_name}
                      className="rounded-full ml-2 max-w-[50px] cursor-pointer"
                    />
                    <span className="font-semibold p-2 text-xs uppercase">
                      {user.full_name}
                    </span>
                    <div className="absolute right-0 top-full invisible z-50 profile">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="flex items-center px-6 py-3 hover:bg-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="ml-2">
                            <Link to="/profile">Profile</Link>
                          </span>
                        </div>
                        <div className="flex items-center px-6 py-3 hover:bg-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span className="ml-2">
                            <button onClick={handleLogout}>Logout</button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="md:hidden block">
              <button
                className="block md:hidden border border-prihover rounded-md py-2 px-3 bg-indigo-600text-white hover:bg-white hover:text-black"
                onClick={() => setNavMenu(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {navMenu && (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen">
          <div
            className="w-full h-full bg-black opacity-50 z-50"
            onClick={() => setNavMenu(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-center h-full w-full max-w-[300px] bg-white z-[99]">
            <ul className="w-full flex flex-col items-center">
              {listMenu.length > 0 &&
                listMenu.map((item, index) => (
                  <li
                    key={index}
                    className={`inline-block  mx-2  transition-all duration-150
                      ${
                        item.replace(/\s/g, "-").toLowerCase() ===
                        "for-recruiter"
                          ? ""
                          : "py-3 px-2.5"
                      }`}
                  >
                    <NavLink
                      className="hover:text-prihover uppercase font-semibold"
                      activeClassName={`${
                        item.replace(/\s/g, "-").toLowerCase() ===
                        "for-recruiter"
                          ? "py-2 px-3 bg-blue-500  rounded-lg border border-blue-500 hover:bg-white font-bold text-white"
                          : "text-prihover"
                      }`}
                      to={`/${item.replace(/\s/g, "-").toLowerCase()}`}
                      onClick={() => setNavMenu(false)}
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
