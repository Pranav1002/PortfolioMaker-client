import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  const [statusError, setStatusError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:8384/api/users/register";
      console.log("Data before email:", email, "and password:", password);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email:email, password:password, firstName:firstName, lastName:lastName, about:about, gender:gender, githubProfile:githubUrl, linkedInProfile:linkedInUrl }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Data:", responseData);
          // ReactSession.set("user", responseData);
         navigate("/");
        // Handle successful login here, e.g., redirect to another page
      } else {
        console.error("Login failed");
        // Handle failed login here, e.g., show error message to user
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <>
      <h2 className="mt-10 text-2xl font-semibold text-center text-gray-700 ">
        Presents<span className="text-indigo-700">You</span> Welcomes You Here
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row max-w-lg mx-auto overflow-hidden bg-white rounded-lg lg:space-x-8 lg:max-w-5xl">
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            {statusError !== "" && (
              <div className="my-4 px-4 py-2 border border-red-700 bg-red-300 text-center rounded-lg">
                <p className="text-red-700">{statusError}</p>
              </div>
            )}

            <div className="flex gap-2">
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="my-4 flex gap-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Gender
              </label>
              <div className="flex">
                <input
                  type="radio"
                  name="gender"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                />
                <span className="px-1 text-gray-700">Male</span>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="gender"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                />
                <span className="px-1 text-gray-700">Female</span>
              </div>
            </div>

            <div className="mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                E-Mail Address
              </label>
              <input
                // type="email"
                type="text"
                name="email"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg  focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-6 py-8 md:px-8">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Tell us about yourself
              </label>
              <textarea
                name="about"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                required
                rows="3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Github Url
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IconContext.Provider
                    value={{
                      className: "shared-className",
                      size: 20,
                    }}
                  >
                    <FaGithub />
                  </IconContext.Provider>
                </div>
                <input
                  // type="url"
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20 pl-10"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Linkedin Url
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IconContext.Provider
                    value={{
                      className: "shared-className",
                      size: 20,
                    }}
                  >
                    <FaLinkedin />
                  </IconContext.Provider>
                </div>
                <input
                  // type="url"
                  type="text"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20 pl-10"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-8">
          <button
            type="submit"
            className="w-4/5 md:w-3/5 mx-auto px-4 py-2 tracking-wide text-white transition-colors duration-300 transform rounded-md bg-indigo-700 hover:bg-indigo-700 /70 focus:outline-none focus:bg-indigo-700 /70"
          >
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 mb-8">
          <span className="w-2/5 border-b  md:w-1/4"></span>

          <Link
            to="/login"
            className="text-xs text-gray-500 uppercase  hover:underline"
          >
            Already have an Account?
          </Link>

          <span className="w-2/5 border-b  md:w-1/4"></span>
        </div>
      </form>
    </>
  );
}
