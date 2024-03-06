import React from "react";

export default function EducationDetails(props) {
  return (
    <div className="mt-8 flex flex-col justify-end text-center md:flex-row md:text-left">
      <div className="md:w-3/5 md:ml-10">
        <div className="relative flex md:pl-18">
          <span className="absolute -right-2 top-1 hidden h-4 w-4 rounded-full border-2 border-gray-400 bg-white md:block"></span>
          <div className="mt-1 flex">
            <div className="md:-mt-1 md:pl-8">
              <span className="block font-body font-bold text-gray-400">
                {props.degree} - {props.field}
              </span>
              <span className="block pt-2 font-header text-xl font-bold uppercase text-primary">
                {props.institute}
              </span>
              <div className="pt-2">
                <span className="block font-body text-black">
                  CGPA: {props.grade}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
