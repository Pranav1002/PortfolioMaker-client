import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdLogout,
  MdWebStories,
  MdScience,
} from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { IconContext } from "react-icons";

import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = ReactSession.get("user");

  const [toggleSideBar, setToggleSideBar] = useState(true);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={() => setToggleSideBar(!toggleSideBar)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  PresentsYou
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm items-center rounded-full"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    {/* User Logo */}
                    {(
                      <span className="px-2 font-normal text-gray-900">
                        {/* {user.firstName + " " + user.lastName} */}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={
          toggleSideBar
            ? "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0"
            : "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform-none bg-white border-r border-gray-200 md:translate-x-0"
        }
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <IconContext.Provider
                  value={{
                    className: "shared-class",
                    size: 24,
                    color: "gray",
                  }}
                >
                  <MdSpaceDashboard />
                </IconContext.Provider>
                <span className="ml-3">Public Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className="flex items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <IconContext.Provider
                  value={{
                    className: "shared-class",
                    size: 24,
                    color: "gray",
                  }}
                >
                  <FaGraduationCap />
                </IconContext.Provider>
                <span className="flex-1 ml-3 whitespace-nowrap">Education</span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="flex items-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <IconContext.Provider
                  value={{
                    className: "shared-class",
                    size: 24,
                    color: "gray",
                  }}
                >
                  <MdScience />
                </IconContext.Provider>
                <span className="flex-1 ml-3 whitespace-nowrap">Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/experiences"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
              >
                <IconContext.Provider
                  value={{
                    className: "shared-class",
                    size: 24,
                    color: "gray",
                  }}
                >
                  <MdWebStories />
                </IconContext.Provider>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Experiences
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  ReactSession.remove("user");
                  navigate("/login");
                }}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
              >
                <IconContext.Provider
                  value={{
                    className: "shared-class",
                    size: 24,
                    color: "gray",
                  }}
                >
                  <MdLogout />
                </IconContext.Provider>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
