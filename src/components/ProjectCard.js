import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaEdit, FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import { ReactSession } from "react-client-session";

export default function ProjectCard(props) {
  const user = ReactSession.get("user");

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [month, setMonth] = useState(props.month);
  const [year, setYear] = useState(props.year);
  const [githubUrl, setGithubUrl] = useState(props.githubUrl);
  const [live, setLive] = useState(props.live);

  const [toggleModal, setToggleModal] = useState(true);

  const handleDelete = async (id) => {
    
    try {
      console.log("id of project for delete" , id);
      const apiUrl = `http://localhost:8384/api/projects/delete/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      });
      if (response.ok) {
        
          console.log("delete succesfull");
          props.reloadProject();
          ReactSession.set("reload" , "delete");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setToggleModal(true);
    try {
      console.log("userId" , user.userId);
    const apiUrl = `http://localhost:8384/api/projects/update/${props.id}`;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        
        id: props.id,
        title: title,
        description: description,
        month:month,
        year:year,
        githubUrl: githubUrl,
        liveUrl: live,
        user: {
          userId:user.userId
        }
      }),
    });
    if (response.ok) {
      const responseData = await response.json();
              console.log("update data" , responseData);
              props.reloadProject();
              ReactSession.set("reload" , "update");

              
    } else {
      console.error("update failed");
    }
  } catch (error) {
    console.error("Error during update:", error);
  }
  };

  return (
    <>
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-xl w-full md:w-96">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="flex justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {props.title}
          </h3>

          <div className="flex gap-2">
            <button
              type="button"
              title="Edit Project"
              onClick={() => setToggleModal(!toggleModal)}
            >
              <IconContext.Provider
                value={{
                  className: "shared-className",
                  size: 20,
                }}
              >
                <FaEdit />
              </IconContext.Provider>
            </button>
            <button
              type="button"
              title="Edit Project"
              onClick={() => handleDelete(props.id)}
            >
              <IconContext.Provider
                value={{
                  className: "shared-className",
                  size: 20,
                }}
              >
                <FaTrash />
              </IconContext.Provider>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">
            {props.description}
          </p>
        </div>

        <dl className="mt-6 flex justify-between items-end gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Published</dt>
            <dd className="text-xs text-gray-500">{props.published}</dd>
          </div>
          <div className="flex gap-4">
            {props.github !== "" && (
              <a href={props.github} target="_blank" title="Github Link">
                <IconContext.Provider
                  value={{
                    className: "shared-className",
                    size: 20,
                  }}
                >
                  <FaGithub />
                </IconContext.Provider>
              </a>
            )}
            {props.live !== "" && (
              <a href={props.live} target="_blank" title="Live Demo">
                <IconContext.Provider
                  value={{
                    className: "shared-className",
                    size: 20,
                  }}
                >
                  <FaExternalLinkAlt />
                </IconContext.Provider>
              </a>
            )}
          </div>
        </dl>
      </div>

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex="-1"
        aria-hidden="true"
        className={
          toggleModal
            ? "fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
            : "fixed top-0 left-0 right-0 z-50 block w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        }
      >
        <div className="relative w-full h-full m-auto md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow max-w-lg ">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Add New Project
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => setToggleModal(true)}
              >
                <IconContext.Provider
                  value={{
                    className: "shared-className",
                    size: 22,
                  }}
                >
                  <MdClose />
                </IconContext.Provider>
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              {/* <!-- Modal body --> */}
              <div className="py-2 px-6 space-y-6">
                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    autoComplete="email"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Description
                  </label>
                  <textarea
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Published
                  </label>
                  <div className="mt-2 flex gap-2">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      onChange={(e) => setMonth(e.target.value)}
                      value={month}
                    >
                      <option value="">--Select Month--</option>
                      <option value="Janaury">Janaury</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                    >
                      <option value="">--Select Year--</option>
                      <option value="2024">2023</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2018">2016</option>
                      <option value="2019">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
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
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Live Demo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IconContext.Provider
                        value={{
                          className: "shared-className",
                          size: 20,
                        }}
                      >
                        <FaExternalLinkAlt />
                      </IconContext.Provider>
                    </div>
                    <input
                      type="url"
                      value={live}
                      onChange={(e) => setLive(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setToggleModal(true)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
