import React, {useState, useEffect} from "react";
import {
  ListJob,
  AddJob,
  EditJob,
  AddQuestion,
  ListQuestion,
} from "../components";

function Recruiter({userInfo, title}) {
  const [user, setUser] = useState({
    info: {...userInfo.user_info},
    role: userInfo.role_level,
    user_id: userInfo.user_id,
  });

  useEffect(() => {
    if (userInfo.user_info) {
      setUser({
        info: userInfo.user_info,
        role: userInfo.role_level,
        user_id: userInfo.user_id,
      });
    }
  }, [userInfo]);

  const [tab, setTab] = useState("list-job");
  const tabChange = (tabName) => {
    setTab(tabName);
  };

  const renderTab = () => {
    switch (tab) {
      case "add-question":
        return <AddQuestion userInfo={user} />;
      case "add-job":
        return <AddJob userInfo={user} />;
      case "edit-job":
        return <EditJob />;
      case "list-question":
        return <ListQuestion />;
      default:
        return <ListJob userInfo={user} />;
    }
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <main>
      <section className="py-10 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-4 font-bold">Your Profile</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="flex">
            <div className="w-full md:w-1/4">
              <div className="p-4 shadow-md bg-gray-50">
                <div className="mb-4">
                  <img
                    // random user image
                    src={user.info.logo_url}
                    alt="user"
                    className="max-w-[120px] h-[120px] object-contain rounded-full mx-auto border "
                  />
                </div>
                <h3 className="text-lg text-center">
                  <span className="font-semibold">{user.info.full_name}</span>
                </h3>
                <ul className="block my-5">
                  <li className="">
                    <button
                      className={`py-2 px-3 flex items-center w-full hover:bg-gray-400 transition duration-300 ${
                        tab === "list-job" ? "bg-gray-400" : ""
                      }`}
                      onClick={() => tabChange("list-job")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      <span className="ml-2">List Job</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className={`py-2 px-3 flex items-center w-full hover:bg-gray-400 transition duration-300 ${
                        tab === "add-job" ? "bg-gray-400" : ""
                      }`}
                      onClick={() => tabChange("add-job")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="ml-2">Post a New Job</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className={`py-2 px-3 flex items-center w-full hover:bg-gray-400 transition duration-300 ${
                        tab === "edit-job" ? "bg-gray-400" : ""
                      }`}
                      onClick={() => tabChange("edit-job")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span className="ml-2">Edit Job</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className={`py-2 px-3 flex items-center w-full hover:bg-gray-400 transition duration-300 ${
                        tab === "add-question" ? "bg-gray-400" : ""
                      }`}
                      onClick={() => tabChange("add-question")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="ml-2">Add a New Question</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className={`py-2 px-3 flex items-center w-full hover:bg-gray-400 transition duration-300 ${
                        tab === "list-question" ? "bg-gray-400" : ""
                      }`}
                      onClick={() => tabChange("list-question")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      <span className="ml-2">List Question</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <div className="p-5 mx-4 shadow-md bg-gray-100">
                {renderTab()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Recruiter;
