import React, {Component} from "react";

function Forgotpass() {
  return (
    <>
      <div className="fixed shadow-2xl rounded-lg bg-gray-200 p-5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button className="absolute top-0 right-0 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div>
          <div className="mb-5 text-left">
            <h3 className="text-black text-lg font-bold">Forgot password</h3>
          </div>
          <div className="mb-5">
            <label className="mr-3 font-medium">Email</label>
            <input type="email" className="px-3 py-2 rounded-lg" />
          </div>
          <div className="text-center">
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgotpass;
