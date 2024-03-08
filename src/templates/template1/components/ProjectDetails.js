import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function ProjectDetails(props) {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-xl ">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          {props.title}
        </h3>
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
              <a href={props.github} title="Github Link">
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
              <a href={props.live} title="Live Demo">
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
    </div>
  );
}
