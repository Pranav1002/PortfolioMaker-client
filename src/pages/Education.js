import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdAdd, MdClose } from "react-icons/md";
import { ReactSession } from "react-client-session";

import EducationCard from "../components/EducationCard";

export default function Education() {
  const navigate = useNavigate();
  const user = ReactSession.get("user");

  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [grade, setGrade] = useState("");
  const [educations, setEducations] = useState([]);
  const [reload , setreload] = useState("new");
  const [toggleModal, setToggleModal] = useState(true);

  // useEffect(() => {
  //   // const user = ReactSession.get("user");
  //   if (!user) {
  //     navigate("/login");
  //   }
  

 
  //   console.log("user id" , user.userId);
  //   fetch(
  //     "http://localhost:8384/api/educations/" + user.userId
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setEducations(data));
  // } , [navigate,user]);

  useEffect(() => {
    const user = ReactSession.get("user");
    if (!user) {
      navigate("/login");
    } else {
      console.log("user id for fetch education of that user \n", user.userId);
      fetch(`http://localhost:8384/api/educations/get/${user.userId}`)
        .then((res) => res.json())
        .then((data) => 
        {
          // console.log(educations);
          console.log("all educations" , data);
          setEducations(data);
        }
        )
        .catch((error) => console.error("Error fetching educations:", error));
    }
  },[navigate , reload]);
  
  const reloadEducation = () => {
    setreload(reload + "a");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in u");
    // fetch("http://localhost:8384/api/educations", {
    //   method: "POST",
    //   crossDomain: true,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     institute: institute,
    //     degree: degree,
    //     field: field,
    //     grade: parseFloat(grade),
    //     user : {
    //       userId : user.userId
    //     }
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("after url") ;
    //     if (data.status === 400) {
    //       console.error("Error Occured");
    //     } else {
    //       console.info("Education Added");
    //       setToggleModal(true);
    //       navigate("/education");
    //     }
    //   });
    try {
      const apiUrl = "http://localhost:8384/api/educations";
      // console.log("Data before email:", email, "and password:", password);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ 
          institute: institute,
              degree: degree,
              field: field,
              grade: parseFloat(grade),
              user : {
                userId : user.userId
              }
         }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Data:", responseData);
          // ReactSession.set("user", responseData);
          navigate("/education");
          console.info("Education Added");
                setToggleModal(true);
                setreload("change");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold text-gray-700">Education</p>
        <button
          className="flex items-center p-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600"
          type="button"
          onClick={() => setToggleModal(!toggleModal)}
        >
          <MdAdd />
          <span className="pl-2 text-base font-medium">Add Education</span>
        </button>
      </div>
      <hr className="my-2" />
      <ul className="flex flex-col">
         {educations.map((education) => (
          <EducationCard
            key={education.id}
            id={education.eduId}
            institute={education.institute}
            degree={education.degree}
            field={education.field}
            grade={education.grade}
            reloadEducation={reloadEducation}
          />
        ))} 
      </ul>

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
                Add New Education
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
            <form onSubmit={handleSubmit}>
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
