import React, {useState, useEffect} from "react";

import {ProfileTab, PasswordTab} from "../components";

function Profile({userInfo, title}) {
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

  const [tab, setTab] = useState("profile");

  const tabChange = (tabName) => {
    setTab(tabName);
  };
  const renderTab = () => {
    switch (tab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "change-password":
        return <PasswordTab user={user} />;
      default:
        return <ProfileTab user={user} />;
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
              <div className="p-4 shadow-md bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <img
                    // random user image
                    src="https://picsum.photos/200"
                    alt={user.info.full_name}
                    className="max-w-[120px] rounded-full mx-auto"
                  />
                </div>
                <h3 className="text-lg text-center">
                  <span className="font-semibold">{user.info.full_name}</span>
                </h3>
                <ul className="block my-5">
                  <li className="">
                    <button
                      className={`py-2 px-3 rounded-lg flex items-center w-full hover:bg-gray-400 transition duration-300 ${
                        tab === "profile" ? "bg-gray-400" : ""
                      }`}
                      onClick={() => tabChange("profile")}
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
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <span className="ml-2">Profile</span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      className={`py-2 px-3 rounded-lg flex items-center w-full hover:bg-gray-400 transition duration-300 ${
                        tab === "change-password" ? "bg-gray-400" : ""
                      }`}
                      onClick={() => tabChange("change-password")}
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="ml-2">Change Password</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <div className="p-5 mx-4 shadow-md bg-gray-100 rounded-lg">
                {renderTab()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
