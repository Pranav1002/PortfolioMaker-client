import React from "react";

export default function header() {
  return (
    <header aria-label="Site Header" className="bg-transparent">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-2xl" href="/">
              <span className="">&#128075;</span>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Site Nav" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white-500 transition hover:text-gray-500/75"
                    href="#home"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-white-500 transition hover:text-gray-500/75"
                    href="#about"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    className="text-white-500 transition hover:text-gray-500/75"
                    href="#education"
                  >
                    Education
                  </a>
                </li>

                <li>
                  <a
                    className="text-white-500 transition hover:text-gray-500/75"
                    href="#experience"
                  >
                    Experiences
                  </a>
                </li>

                <li>
                  <a
                    className="text-white-500 transition hover:text-gray-500/75"
                    href="#project"
                  >
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    className="text-white-500 transition hover:text-gray-500/75"
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <div className="block md:hidden">
              <button className="rounded bg-transparent p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
