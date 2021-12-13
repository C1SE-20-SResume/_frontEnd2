import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Loader from "./Loader";

function Home({role, title}) {
  const [listJob, setListJob] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/popularjob`)
      .then((res) => res.json())
      .then((data) => {
        setListJob(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      {/* <Loader /> */}
      <main>
        <section className="py-10  bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
          <div className="container">
            <div className="text-center mb-6">
              <h2 className="text-2xl mb-1 font-bold">Latest Jobs</h2>
              <p className="text-center font-light text-sm text-gray-500 mb-10">
                Here's the most recent job listed on the website.
              </p>
            </div>
            <div className="p-2">
              {listJob.length > 0 &&
                listJob.map((job) => (
                  <Link to={`/job/${job.job_id}`} key={job.job_id}>
                    <div className="p-6 mb-6 shadow-md rounded-lg bg-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={job.logo_url}
                            alt=""
                            className="max-w-[80px] h-auo"
                          />
                        </div>
                        <div>
                          <h4
                          // limit the length of character
                          >
                            {job.job_title.length > 20
                              ? job.job_title.substring(0, 20) + "..."
                              : job.job_title}
                          </h4>
                          <p className="font-bold">{job.company_name}</p>
                        </div>
                        <ul className="flex items-center">
                          <li className="p-5">
                            <span className="flex items-center">
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
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span className="ml-2">{job.job_place}</span>
                            </span>
                          </li>
                          <li className="p-5">
                            <span className="flex items-center">
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
                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              <span className="ml-2">{job.salary}$</span>
                            </span>
                          </li>
                          <li className="p-5">
                            <span className="flex items-center">
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
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="ml-2">
                                {
                                  // format date
                                  new Date(job.date_expire).toLocaleDateString(
                                    "vi-VN"
                                  )
                                }
                              </span>
                            </span>
                          </li>
                          <li className="p-5">
                            <span className="flex items-center">
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
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="ml-2">Full Time</span>
                            </span>
                          </li>
                          <li className="p-5">
                            <span className="flex items-center hover:translate-x-3 transition-all duration-300 hover:text-prihover">
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
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                              <span className="ml-2">
                                {role !== 1 ? "Apply Now" : "See Detail"}
                              </span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            <div className="text-center my-6">
              <Link to="/job">
                <button className="py-2 px-6 border-2 text-prihover border-prihover hover:border-prihover hover:bg-prihover hover:text-white transition-all duration-300 rounded-lg uppercase font-semibold">
                  Load More
                </button>
              </Link>
            </div>
          </div>
          {/* do add */}
          <div className="container my-10">
            <div className="pt-12">
              <h1 className="text-2xl text-center mb-1 font-bold">Tutorial</h1>
            </div>
            <p className="text-center font-light text-sm text-gray-500 mb-10">
              Very easy to use
            </p>
            <div className="grid grid-cols-3 gap-x-6 max-w-6xl mx-auto">
              <div>
                <div className="mb-5">
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/user-login-2445911-2064332.png"
                    alt=""
                    className="
        w-48
        h-full
        rounded-full
        border-solid border-4 border-blue-500
        object-cover
        mx-auto
      "
                  />
                </div>
                <h3 className="text-center font-medium text-lg mb-3">LOGIN</h3>
                <span className="block text-center text-gray-400 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Corporis, aut distinctio totam autem maiores architecto vitae
                  mollitia in asperiores, quam cumque. Nisi optio nemo ipsa quod
                  autem quia animi debitis.
                </span>
              </div>
              <div>
                <div className="mb-5">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Circle-icons-news.svg/1200px-Circle-icons-news.svg.png"
                    alt=""
                    className="
                  
                    
        w-48
        h-full
        rounded-full
        border-solid border-4 border-blue-500
        object-cover
        mx-auto
      "
                  />
                </div>
                <h3 className="text-center font-medium text-lg mb-3">
                  VIEW JOB
                </h3>
                <span className="block text-center text-gray-400 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Corporis, aut distinctio totam autem maiores architecto vitae
                  mollitia in asperiores, quam cumque. Nisi optio nemo ipsa quod
                  autem quia animi debitis.
                </span>
              </div>
              <div>
                <div className="mb-5">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Handshake_icon.svg/480px-Handshake_icon.svg.png"
                    alt=""
                    className="
        w-48
        h-full
        rounded-full
        border-solid border-4 border-blue-500
        object-cover
        mx-auto
      "
                  />
                </div>
                <h3 className="text-center font-medium text-lg mb-3">
                  APPLY YOUR CV
                </h3>
                <span className="block text-center text-gray-400 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Corporis, aut distinctio totam autem maiores architecto vitae
                  mollitia in asperiores, quam cumque. Nisi optio nemo ipsa quod
                  autem quia animi debitis.
                </span>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="text-center mb-6">
              <h2 className="text-2xl mb-1 font-bold">Blog</h2>
              <p className="text-center font-light text-sm text-gray-500 mb-10">
                What did users respond to when using the website? .
              </p>
            </div>
            <div className="flex flex-col min-h-screen ">
              <div className="bg-white pt-12 pb-6 rounded-lg flex-1">
                <div className="container mx-auto">
                  <div className="flex flex-wrap md:-mx-3">
                    <div className="md:w-1/2 px-3 mb-6 w-full">
                      <div
                        className="flex w-full h-full flex-col flex-wrap bg-cover bg-no-repeat bg-center p-5 rounded overflow-hidden"
                        style={{
                          backgroundImage:
                            "url(https://images.unsplash.com/photo-1513438205128-16af16280739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=935&q=80)",
                        }}
                      >
                        <h2 className="text-white text-lg mb-2">
                          Is The Herbal Way The Right Way
                        </h2>
                        <p className="text-white opacity-50">
                          Adwords Keyword Research For Beginners
                        </p>
                        <div className="flex flex-wrap justify-between items-center mt-auto pt-6">
                          <div className="inline-flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <img src="https://randomuser.me/api/portraits/women/2.jpg" />
                            </div>
                            <div className="flex-1 pl-2">
                              <h2 className="text-white mb-1">Ollie McBride</h2>
                              <p className="text-white opacity-50 text-xs">
                                May 18
                              </p>
                            </div>
                          </div>
                          <span className="text-white opacity-50">
                            <svg
                              className="fill-current w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 459 459"
                            >
                              <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 w-full">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-2/6">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1532799755889-1247a1b7f10e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1936&q=80"
                          />
                        </div>
                        <div className="w-4/6 p-5 bg-gradient-to-r from-purple-500 to-pink-500">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/5.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">Luke Nunez</h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 w-full">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-2/6">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                          />
                        </div>
                        <div className="w-4/6 p-5 bg-gradient-to-r from-green-300 to-purple-400">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/8.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">
                                  Jonathan Mithu
                                </h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 w-full">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-2/6">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                          />
                        </div>
                        <div className="w-4/6 p-5 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/11.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">Chris Sonne</h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 w-full">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-2/6">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjU1MzA3fQ&auto=format&fit=crop&w=2250&q=80"
                          />
                        </div>
                        <div className="w-4/6 p-5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/33.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">Mike Olle</h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 w-full">
                      <div
                        className="flex w-full h-full flex-col flex-wrap bg-cover bg-no-repeat bg-center p-5 rounded overflow-hidden"
                        style={{
                          backgroundImage:
                            "url(https://images.unsplash.com/photo-1539623704225-548826dc5a08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80)",
                        }}
                      >
                        <h2 className="text-white text-lg mb-2">
                          Is The Herbal Way The Right Way
                        </h2>
                        <p className="text-white opacity-50">
                          Adwords Keyword Research For Beginners
                        </p>
                        <div className="flex flex-wrap justify-between items-center mt-auto pt-6">
                          <div className="inline-flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <img src="https://randomuser.me/api/portraits/women/2.jpg" />
                            </div>
                            <div className="flex-1 pl-2">
                              <h2 className="text-white mb-1">Jack Roath</h2>
                              <p className="text-white opacity-50 text-xs">
                                May 18
                              </p>
                            </div>
                          </div>
                          <span className="text-white opacity-50">
                            <svg
                              className="fill-current w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 459 459"
                            >
                              <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 px-3 mb-6">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-full">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                          />
                        </div>
                        <div className="w-full p-5 bg-blue-500">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/22.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">Chris Sonne</h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 px-3 mb-6">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-full">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2247&q=80"
                          />
                        </div>
                        <div className="w-full p-5 bg-blue-500">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/23.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">Chris Sonne</h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 px-3 mb-6">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-full">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1565388161858-5ae922cbfde0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                          />
                        </div>
                        <div className="w-full p-5 bg-blue-500">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/25.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">Chris Sonne</h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 px-3 mb-6">
                      <div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
                        <div className="w-full">
                          <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2195&q=80"
                          />
                        </div>
                        <div className="w-full p-5 bg-blue-500">
                          <h2 className="text-white leading-normal text-lg">
                            How To Boost Your Traffic Of Your Blog And Destroy
                            The Competition
                          </h2>
                          <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="inline-flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img src="https://randomuser.me/api/portraits/men/29.jpg" />
                              </div>
                              <div className="flex-1 pl-2">
                                <h2 className="text-white mb-1">Chris Sonne</h2>
                                <p className="text-white opacity-50 text-xs">
                                  May 18
                                </p>
                              </div>
                            </div>
                            <span className="text-white opacity-50">
                              <svg
                                className="fill-current w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 459 459"
                              >
                                <path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="border border-gray-600 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-600 hover:text-white">
                      Show More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
