import React, {Component} from "react";

function Loader() {
  return (
    <>
      <div className="min-h-screen min-w-screen z-50 fixed top-0 left-0 right-0 flex justify-center items-center bg-transparent backdrop-blur-sm ">
        <div className="flex items-center justify-center ">
          <div className="w-16 h-16 border-b-8 border-indigo-700 rounded-full animate-spin" />
        </div>
      </div>
    </>
  );
}

export default Loader;
