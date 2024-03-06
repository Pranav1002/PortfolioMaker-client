import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "./components/Header";
import ProjectDetails from "./components/ProjectDetails";
import EducationDetails from "./components/EducationDetails";
import ExperienceDetails from "./components/ExperienceDetails";
import Contact from "./components/Contact";
import SkillDetails from "./components/SkillDetails";

import { IconContext } from "react-icons";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Index() {
  let params = useParams();

  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);

  const getUser = (userId) => {
    fetch(`https://localhost:7054/api/Users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  const getEducations = (userId) => {
    fetch(
      `https://localhost:7054/api/Educations/GetEducationsByUserId/${userId}`
    )
      .then((res) => res.json())
      .then((data) => setEducations(data));
  };

  const getExperiences = (userId) => {
    fetch(
      `https://localhost:7054/api/Experiences/GetExperiencesByUserId/${userId}`
    )
      .then((res) => res.json())
      .then((data) => setExperiences(data));
  };

  const getProjects = (userId) => {
    fetch(`https://localhost:7054/api/Projects/GetProjectsByUserId/${userId}`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  const getProfile = (profileId) => {
    fetch(`https://localhost:7054/api/Profile/GetProfile/${profileId}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  };

  useEffect(() => {
    let profileId = params.id;
    let userId = profileId.split("-")[2];

    getProfile(profileId);
    getUser(userId);
    getEducations(userId);
    getExperiences(userId);
    getProjects(userId);
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  if (profile && profile.status !== "Public") {
    return <p>Sorry, profile is private</p>;
  }

  return (
    <>
      {/* <!-- header section --> */}
      <section id="home" className="bg-gray-900 text-white">
        <Header />

        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold sm:text-5xl">
              Hello, I'm {user.firstName} {user.lastName}
            </h1>

            {user.githubProfile !== "" && user.linkedInProfile !== "" && (
              <div className="flex flex-row justify-center items-baseline flex-start">
                <p className="mt-4 sm:text-xl sm:leading-relaxed">
                  Let's Connect{" "}
                  <span className="text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text">
                    &gt;
                  </span>
                </p>
                {/* Social Links */}
                <div className="mx-2 flex gap-2">
                  {user.githubProfile !== "" && (
                    <a href={user.githubProfile} target="_blank">
                      <IconContext.Provider
                        value={{
                          className: "shared-className",
                          size: 20,
                        }}
                      >
                        <FiLinkedin />
                      </IconContext.Provider>
                    </a>
                  )}

                  {user.linkedInProfile !== "" && (
                    <a href={user.linkedInProfile} target="_blank">
                      <IconContext.Provider
                        value={{
                          className: "shared-className",
                          size: 20,
                        }}
                      >
                        <FiGithub />
                      </IconContext.Provider>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* <!-- header section ends --> */}

      {/* <!-- about section --> */}
      <section id="about">
        <div className="px-16 bg-gray-50" id="about">
          <div className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
            <div className="w-full text-center sm:w-3/4 lg:w-3/5 lg:text-left">
              <h2 className="font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                Who am I?
              </h2>
              <h4 className="pt-6 font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                I'm {user.firstName} {user.lastName}
              </h4>
              <p className="pt-6 font-body leading-relaxed text-gray-20">
                {user.about !== ""
                  ? user.about
                  : `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.`}
              </p>
            </div>
            <div className="w-full pl-0 pt-10 sm:w-3/4 lg:w-2/5 lg:pl-12 lg:pt-0">
              <SkillDetails />
              <SkillDetails />
              <SkillDetails />
              <SkillDetails />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- about section ends --> */}

      {/* <!-- education section --> */}
      {educations.length > 0 && (
        <section id="education">
          <div className="container py-16 md:py-20" id="work">
            <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
              My Education
            </h2>
            <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              These are school & universities where I studied
            </h3>

            <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
              <span className="right-0 absolute inset-y-0 ml-10 hidden w-0.5 bg-gradient-to-b from-green-300 via-blue-500 to-purple-600 md:block"></span>
              {educations.map((education) => {
                return (
                  <EducationDetails
                    key={education.id}
                    institute={education.institute}
                    degree={education.degree}
                    field={education.field}
                    grade={education.grade}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* <!-- education section ends --> */}

      {/* {<!-- experience section --> */}
      {experiences.length > 0 && (
        <section id="experience">
          <div className="container py-16 md:py-20" id="work">
            <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
              My work experience
            </h2>
            <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              Here's what I did
            </h3>

            <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
              <span className="left-0 absolute inset-y-0 ml-10 hidden w-0.5 bg-gradient-to-b from-green-300 via-blue-500 to-purple-600 md:block"></span>
              {experiences.map((experience) => {
                return (
                  <ExperienceDetails
                    key={experience.id}
                    role={experience.role}
                    startDate={experience.startDate}
                    endDate={experience.endDate}
                    companyName={experience.companyName}
                    description={experience.description}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* {<!-- experience section ends -->} */}

      {/* {<!-- project section -->} */}
      {projects.length > 0 && (
        <section id="project">
          <div className="container py-4" id="work">
            <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
              My Projects
            </h2>
            <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              Cool stuff that I created
            </h3>
          </div>
          <div className="container my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {projects.map((project) => {
                return (
                  <ProjectDetails
                    key={project.id}
                    title={project.title}
                    published={project.date}
                    description={project.description}
                    github={project.githubUrl}
                    live={project.liveUrl}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* {<!-- project section ends -->} */}

      {/* {<!-- contact section -->} */}
      <section id="contact" className="bg-gray-900 pt-16 pb-8">
        <div className="container pb-4 md:pb-16" id="work">
          <h2 className="text-center font-header text-4xl font-semibold uppercase text-white sm:text-5xl lg:text-6xl">
            HERE'S A CONTACT FORM
          </h2>
          <h3 className="pt-6 text-center font-header text-xl font-medium text-white sm:text-2xl lg:text-3xl">
            Have Any Questions?
          </h3>
        </div>
        <Contact />
      </section>
      {/* <!-- contact section ends --> */}

      <section className="bg-gray-900 py-3 px-2">
        <hr className="h-px my-4 bg-gray-700 border-0" />
        <p className="text-center text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text">
          Designed By PresentsYou
        </p>
      </section>
    </>
  );
}
