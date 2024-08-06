import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import { ReactSession } from "react-client-session";

export default function ExperienceCard(props) {
  const user = ReactSession.get("user");
console.log("props :" , props);
  const [toggle, setToggle] = useState(true);
  const [toggleModal, setToggleModal] = useState(true);

  const [companyName, setCompanyName] = useState(props.companyName);
  const [role, setRole] = useState(props.role);
  const [description, setDescription] = useState(props.description);
  const [startMonth, setStartMonth] = useState(props.startMonth);
  const [startYear, setStartYear] = useState(props.startYear);
  const [endMonth, setEndMonth] = useState(props.endMonth);
  const [endYear, setEndYear] = useState(props.endYear);

  const handleDelete = async (id) => {
    
    try {
      console.log("id of exp for delete" , id);
      const apiUrl = `http://localhost:8384/api/experiences/delete/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": `Bearer ${user.accessToken}`
        }
      });
      if (response.ok) {
        
          console.log("delete succesfull");
          props.reloadExperience();
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
    const apiUrl = `http://localhost:8384/api/experiences/update/${props.id}`;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${user.accessToken}`
      },
      body: JSON.stringify({
        
        id: props.id,
        companyName: companyName,
        role: role,
        description: description,
        startMonth: startMonth ,
        endMonth: endMonth,
        startYear: startYear,
        endYear: endYear,
        user: {
          userId:user.userId
        }
      }),
    });
    if (response.ok) {
      const responseData = await response.json();
              console.log("update data" , responseData);
              props.reloadExperience();
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
      <li className="bg-white my-2 shadow-lg">
        <h2 className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer">
          <div className="w-full flex flex-row justify-between">
            <span onClick={() => setToggle(!toggle)}>{props.companyName}</span>
            <div className="flex flex-row mx-2 gap-2">
              <button
                type="button"
                title="Edit Project"
                onClick={() => setToggleModal(!toggleModal)}
              >
                <IconContext.Provider
                  value={{
                    className: "shared-className",
                    size: 18,
                  }}
                >
                  <FaEdit />
                </IconContext.Provider>
              </button>
              <button
                type="button"
                title="Delete Project"
                onClick={() => {
                  handleDelete(props.id);
                }}
              >
                <IconContext.Provider
                  value={{
                    className: "shared-className",
                    size: 18,
                  }}
                >
                  <FaTrash />
                </IconContext.Provider>
              </button>
            </div>
          </div>
          <svg
            onClick={() => setToggle(!toggle)}
            className="fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500"
            viewBox="0 0 20 20"
          >
            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
          </svg>
        </h2>
        <div
          className={
            toggle
              ? "border-l-2 border-purple-600 overflow-hidden max-h-full duration-500 transition-all"
              : "border-l-2 border-purple-600 overflow-hidden max-h-0 duration-500 transition-all"
          }
        >
          <div className="p-3 text-gray-900">
            <p className="text-gray-500 font-medium">
              <i>
                {props.startMonth} {props.startYear} - {props.endMonth}{" "}
                {props.endYear}
              </i>
            </p>
            <p className="text-base font-light">
              <span className="font-semibold">Role: </span>
              {props.role}
            </p>
            <p className="text-base font-light">
              <span className="font-semibold">Description: </span>
              {props.description}
            </p>
          </div>
        </div>
      </li>
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
                Update Experience
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    autoComplete="email"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Role
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    autoComplete="email"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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
                    Start Date
                  </label>
                  <div className="mt-2 flex gap-2">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      onChange={(e) => setStartMonth(e.target.value)}
                      value={startMonth}
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
                      onChange={(e) => setStartYear(e.target.value)}
                      value={startYear}
                    >
                      <option value="">--Select Year--</option>
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

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    End Date
                  </label>
                  <div className="mt-2 flex gap-2">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      onChange={(e) => setEndMonth(e.target.value)}
                      value={endMonth}
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
                      onChange={(e) => setEndYear(e.target.value)}
                      value={endYear}
                    >
                      <option value="">--Select Year--</option>
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
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Update
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
