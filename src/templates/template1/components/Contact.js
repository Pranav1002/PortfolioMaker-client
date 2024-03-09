import React from "react";

export default function Contact() {
  return (
    <div className="px-4 mx-auto max-w-screen-md">
      <form action="#" className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="name@domain.com"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300 ">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-900 shadow-sm"
            placeholder="Let us know how we can help you"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-300 ">
            Your message
          </label>
          <textarea
            id="message"
            rows="6"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-900"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-3 px-5 text-sm font-medium text-center text-gray-300 rounded-lg sm:w-fit hover:bg-white hover:text-gray-900 border border-white"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
