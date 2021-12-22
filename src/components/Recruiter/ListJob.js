import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

function ListJob() {
  const [cookies] = useCookies(["user"]);

  const [show, setShow] = useState(false);
  const [showkey, setShowkey] = useState(false);
  const [numberKey, setNumberKey] = useState(null);
  const [showScore, setScore] = useState(false);
  const [numberScore, setNumberScore] = useState(null);
  const [job, setJob] = useState({
    company_name: "",
    listJob: [],
  });

  const [page, setPage] = useState({
    min: 1,
    limit: 9,
    max: 9,
    current: 1,
  });
  const [decs, setDecs] = useState(1);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/apply?api_token=${cookies.user}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJob({
            company_name: data.company_name,
            listJob: data.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [cookies.user]);

  const prevPage = () => {
    if (page.current > 1) {
      setPage({
        ...page,
        min: page.min - page.limit,
        max: page.max - page.limit,
        current: page.current - 1,
      });
    }
  };

  const nextPage = () => {
    let maxPage = Math.ceil(job.listJob.length / page.limit);
    if (page.current < maxPage) {
      setPage({
        ...page,
        min: page.min + page.limit,
        max: page.max + page.limit,
        current: page.current + 1,
      });
    }
  };
  const [results, setResult] = useState({});
  const viewResult = (job_id) => {
    setShow(true);
    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/apply/${job_id}?api_token=${cookies.user}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResult(data);
          console.log("check dataa", results);
        }
      })
      .catch((err) => console.log(err));
  };
  const downloadcv = (cv_path) => {
    const link = document.createElement("a");
    link.href = `https://cvtojob.tk/api/downcv?cv_path=${cv_path}`;
    document.body.appendChild(link);
    link.click();
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // fetch(
    //   `${process.env.REACT_APP_API_URL}/downcv?cv_path=${cv_path}`,
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => {
    //     const url = window.URL.createObjectURL(new Blob([result]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "cv.png");
    //     document.body.appendChild(link);
    //     link.click();
    //   })
    //   .catch((error) => console.log("error", error));
  };
  return (
    <div className="menu-func-recruiter m-2 relative">
      <h2 className="text-xl mb-4">
        <span className="font-bold">
          {job.company_name ? job.company_name : "Loading..."}
        </span>
        {` - `}
        <span className="font-bold">Job Alert</span>
      </h2>
      <hr />
      <div className="grid grid-cols-3 gap-4 my-4">
        {job.listJob && job.listJob.length > 0 ? (
          job.listJob.map(
            (item, index) =>
              index + 1 >= page.min &&
              index <= page.max && (
                <div key={index} className="col-span-1 relative ">
                  <div
                    onClick={(e) => viewResult(item.job_id)}
                    className="menu-func-recruiter flex flex-col justify-between cursor-pointer bg-white shadow-md rounded-lg p-4 h-full"
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <h3 className="text-lg font-bold">
                          {item.job_title.length > 20
                            ? item.job_title.slice(0, 20) + "..."
                            : item.job_title}
                        </h3>
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(item.created_at).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
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
                        <span className="text-xs text-gray-600">
                          {item.job_place}
                        </span>
                      </div>
                      <div className="flex items-center">
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
                        <span className="text-xs text-gray-600">
                          {item.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                  {item.apply_sum > 0 ? (
                    <div
                      className=" absolute
                      top-0
                      right-0
                      -mr-1
                      -mt-1
                      w-5
                      h-5 
                      rounded-full
                      bg-red-600
                      animate-ping"
                    />
                  ) : (
                    ""
                  )}

                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      -mr-1
                      -mt-1
                      w-5
                      h-5
                      rounded-full
                      bg-red-600
                      text-center "
                  >
                    <span className="text-xs  block text-white">
                      {item.apply_sum}
                    </span>
                  </div>
                </div>
              )
          )
        ) : (
          <div className="col-span-1">
            <div className="bg-white shadow-md rounded p-4">
              <div className="flex justify-between">
                <div className="flex">
                  <h3 className="text-lg font-bold">No Job</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr />
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={prevPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span>
          {page.current} of {Math.ceil(job.listJob.length / page.limit)}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {show && (
        <div className=" fixed overflow-y-scroll scrollbar-hide   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen   mx-auto px-4 sm:px-8 backdrop-blur-xl ">
          <div className="pt-20">
            <div className="flex justify-end">
              <button onClick={() => setShow(false)} className="block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 bg-red-600 text-white cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className=" menu-func-recruiter z-0 min-w-full  leading-normal  transition ease-in-out delay-1000">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Full name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Birthday
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Phone number
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Aplly at
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        CV file
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 tracking-wider">
                        <button
                          className="flex items-center text-xs font-bold text-gray-700 uppercase text-left px-5 py-3"
                          onClick={(e) => {
                            e.preventDefault();
                            // sort result.data by cv_score
                            let newResul;
                            if (decs === 1) {
                              newResul = results.data.sort((a, b) => {
                                return b.cv_score - a.cv_score;
                              });
                              setDecs(0);
                            } else {
                              newResul = results.data.sort((a, b) => {
                                return a.cv_score - b.cv_score;
                              });
                              setDecs(1);
                            }

                            setResult((prev) => ({...prev, data: newResul}));
                          }}
                        >
                          Score
                          <span>
                            {decs === 0 ? (
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
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                            ) : (
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
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            )}
                          </span>
                        </button>
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Quiz result
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.data && results.data.length > 0 ? (
                      results.data.map((item, index) => (
                        <tr key={item.job_id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                            <p className="text-gray-900 ">{index + 1}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs ">
                            <p className="text-gray-900 "> {item.full_name}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                            <p className="text-gray-900 ">
                              {item.gender === "o" ? (
                                <p className="text-gray-900 ">male</p>
                              ) : (
                                <p className="text-gray-900">female</p>
                              )}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                            <p className="text-gray-900 ">{item.date_birh}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                            <p className="text-gray-900 ">
                              {item.phone_number}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs ">
                            <p className="text-gray-900 ">{item.email}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs ">
                            <p className="text-gray-900 ">
                              {item.apply_updated_at}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs ">
                            <p
                              className="text-gray-900 "
                              onClick={(e) => {
                                e.preventDefault();
                                downloadcv(item.cv_file);
                              }}
                            >
                              {item.cv_file ? (
                                <button className="p-1 bg-indigo-600 rounded-lg text-white">
                                  Download
                                </button>
                              ) : (
                                ""
                              )}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 relative bg-white text-xs ">
                            <p className="text-gray-900 ">
                              {item.cv_score + "/" + results.require_score}
                              <button
                                className="inline-block"
                                onClick={() => {
                                  setShowkey(true);
                                  setNumberKey(index);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 mx-2 text-indigo-600 cursor-pointer "
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </p>
                            {showkey && index === numberKey ? (
                              <div className="flex menu-func-recruiter  absolute bg-gray-100 top-0 w-max shadow-lg  ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={(e) => setShowkey(false)}
                                  className="h-5 w-5 absolute  right-0 z-50 cursor-pointer text-red-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <div className="m-1  p-2 rounded-lg w-44 overflow-x-scroll flex-wrap  bg-green-500 z-30">
                                  <h3 className="font-bold">
                                    Keyword was found:
                                  </h3>
                                  <span className="text-white">
                                    {item.keyword_found}
                                  </span>
                                </div>
                                <div className="m-1   p-2 rounded-lg w-44 overflow-x-scroll bg-yellow-300 z-30">
                                  <h3 className="font-bold">
                                    Keyword not found:
                                  </h3>
                                  <span className="text-red-500 font-bold">
                                    {item.keyword_not_found}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs ">
                            <div className="group flex items-center justify-center  inline-block relative">
                              <button
                                onClick={(e) => {
                                  setScore(true);
                                  setNumberScore(index);
                                }}
                                className="   cursor-pointer text-center  text-gray-700 font-semibold    "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 inline-block text-indigo-600 "
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
                              </button>
                              {showScore && index === numberScore ? (
                                <div className=" w-max absolute   -top-16   text-gray-700 z-50 pt-1 group-hover:block">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 absolute cursor-pointer text-red-500 right-0"
                                    viewBox="0 0 20 20"
                                    onClick={(e) => setScore(false)}
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <div className="flex items-center justify-between">
                                    <div className="px-3 py-3 mx-1 bg-yellow-300 rounded-lg">
                                      <h3 className="text-center font-bold text-xs whitespace-no-wrap ">
                                        Aptitude Score
                                      </h3>
                                      <p className="text-gray-700 text-xs font-bold">
                                        Maths :{" "}
                                        <span>
                                          {item.aptitude_graph["maths"]}
                                        </span>
                                      </p>
                                      <p className="text-gray-700 text-xs  font-bold">
                                        English :{" "}
                                        <span>
                                          {" "}
                                          {item.aptitude_graph["english"]}
                                        </span>
                                      </p>
                                      <p className="text-gray-700 text-xs  font-bold">
                                        Programing :{" "}
                                        <span>
                                          {" "}
                                          {item.aptitude_graph["programing"]}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="px-3 py-3 mx-1 bg-green-400 rounded-lg">
                                      <h3 className="text-center font-bold text-xs whitespace-no-wrap ">
                                        Personality Score
                                      </h3>
                                      <p className="text-gray-700 text-xs font-bold">
                                        agreeableness :{" "}
                                        <span>
                                          {
                                            item.personality_graph[
                                              "agreeableness"
                                            ]
                                          }
                                        </span>
                                      </p>
                                      <p className="text-gray-700 text-xs  font-bold">
                                        conscientiousness:{" "}
                                        <span>
                                          {
                                            item.personality_graph[
                                              "conscientiousness"
                                            ]
                                          }
                                        </span>
                                      </p>
                                      <p className="text-gray-700 text-xs  font-bold">
                                        extraversion:{" "}
                                        <span>
                                          {
                                            item.personality_graph[
                                              "extraversion"
                                            ]
                                          }
                                        </span>
                                      </p>
                                      <p className="text-gray-700 text-xs  font-bold">
                                        neuroticism:{" "}
                                        <span>
                                          {
                                            item.personality_graph[
                                              "neuroticism"
                                            ]
                                          }
                                        </span>
                                      </p>
                                      <p className="text-gray-700 text-xs  font-bold">
                                        openness :{" "}
                                        <span>
                                          {item.personality_graph["openness"]}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs ">
                            <p className="text-gray-900 ">
                              {item.pass_status == "1" ? (
                                <p className="text-green-400 font-black">
                                  Prioritized
                                </p>
                              ) : (
                                <p className="text-red-500 font-black">
                                  Not Prioritized
                                </p>
                              )}
                            </p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className=" w-full bg-gray-50">
                        <td
                          colSpan="10"
                          className="px-5 py-5 text-center border-b border-gray-200 bg-white text-xs "
                        >
                          <p className="text-gray-900 text-xl font-bold ">
                            NO DATA
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListJob;
