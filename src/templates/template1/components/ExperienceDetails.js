import React from "react";

export default function ExperienceDetails(props) {
  return (
    <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
      <div className="md:w-3/5 md:ml-10">
        <div className="relative flex md:pl-18">
          <span className="absolute -left-2 top-1 hidden h-4 w-4 rounded-full border-2 border-gray-400 bg-white md:block"></span>
          <div className="mt-1 flex">
            <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
            <div className="md:-mt-1 md:pl-8">
              <span className="block font-body font-bold text-gray-400">
                {props.startMonth+" "+props.startYear} - {props.endMonth+" "+props.endYear}
              </span>
              <span className="block pt-2 font-header text-xl font-bold uppercase text-primary">
                {props.companyName} - {props.role}
              </span>
              <div className="pt-2">
                <span className="block font-body text-black">
                  {props.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
