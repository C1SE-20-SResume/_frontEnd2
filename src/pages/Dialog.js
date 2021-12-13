import React, {Component} from "react";

function Dialog({show, title, description, confirm, cancel}) {
  if (!show) {
    return <></>;
  }
  return (
    <div className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="p-5 shadow-md   bg-gray-200 rounded-lg">
        <div>
          <h2 className="text-left uppercase text-xl font-bold">{title}</h2>
        </div>
        <div>
          <p className="py-5">{description}</p>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={cancel}
            className="text-white bg-blue-600 px-4 py-2 rounded-lg mx-2 hover:bg-blue-400"
          >
            No
          </button>
          <button
            onClick={confirm}
            className="text-white bg-red-600 px-4 py-2 rounded-lg mx-2 hover:bg-red-400"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
