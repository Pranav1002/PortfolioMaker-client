import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

export default function EducationCard(props) {
  const user = ReactSession.get("user");
  console.log("props in education card" , props);
  const [toggle, setToggle] = useState(true);
  const [toggleModal, setToggleModal] = useState(true);

  const [institute, setInstitute] = useState(props.institute);
  const [degree, setDegree] = useState(props.degree);
  const [field, setField] = useState(props.field);
  const [grade, setGrade] = useState(props.grade);

  let navigate = useNavigate();


  const handleDelete = async (id) => {

    try {
        console.log("id of education for delete" , props.id);
      const apiUrl = `http://localhost:8384/api/educations/delete/${props.id}`;
      // console.log("Data before email:", email, "and password:", password);
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      if (response.ok) 
      {
          console.info("Education deleted");
          props.reloadEducation();
          ReactSession.set("reload" , "delete");
                // setToggleModal(true);
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
    const apiUrl = `http://localhost:8384/api/educations/update/${props.id}`;
    // console.log("Data before email:", email, "and password:", password);
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        
        institute: institute,
        degree: degree,
        field: field,
        grade: grade,
        user: {
          userId:user.userId,
        }
      }),
    });
    if (response.ok) {
      const responseData = await response.json();
              console.log("update data" , responseData);
              // navigate("/education");
              // navigate("/education");
              props.reloadEducation();
          ReactSession.set("reload" , "update");

              
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
  };

  return (
    <>
      <li className="bg-white my-2 shadow-lg">
        <h2 className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer">
          <div className="w-full flex flex-row justify-between">
            <span onClick={() => setToggle(!toggle)}>{props.institute}</span>
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
            className={
              toggle
                ? "rotate-180 fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500"
                : "fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500"
            }
            viewBox="0 0 20 20"
          >
            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
          </svg>
        </h2>
        <div
          className={
            toggle
              ? "border-l-2 border-purple-600 overflow-hidden max-h-24 duration-500 transition-all"
              : "border-l-2 border-purple-600 overflow-hidden max-h-0 duration-500 transition-all"
          }
        >
          <div className="p-3">
            <p className="text-gray-500 font-medium">
              <i>
                {props.degree} - {props.field}
              </i>
            </p>
            <p className="text-gray-500 font-medium">
              <i>Grade: {props.grade}</i>
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
                Update Education
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
                    Institute
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    autoComplete="email"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Degree
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setDegree(e.target.value)}
                    value={degree}
                  >
                    <option value="">--Select Degree--</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Com">B.Com</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="BE">BE</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Field
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Grade
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
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
