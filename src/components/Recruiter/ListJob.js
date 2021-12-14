import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

function ListJob() {
  const [cookies] = useCookies(["user"]);

  const [show, setShow] = useState(false);
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
          setResult(data.data);
          console.log("check dataa", results);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="m-2 relative">
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
              index >= page.min &&
              index <= page.max && (
                <div key={index} className="col-span-1 relative ">
                  <div
                    onClick={() => viewResult(item.job_id)}
                    className=" flex flex-col justify-between cursor-pointer bg-white shadow-md rounded-lg p-4 h-full"
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <h3 className="text-lg font-bold">
                          {item.job_title.length > 20
                            ? item.job_title.slice(0, 20) + "..."
                            : item.job_title}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-600">
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
                        <span className="text-sm text-gray-600">
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
                        <span className="text-sm text-gray-600">
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
                    <span className="text-sm  block text-white">
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
        <div className="fixed overflow-y-scroll scrollbar-hide  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen   mx-auto px-4 sm:px-8">
          <div className="py-8">
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
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        ID
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
                        email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        CV file
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Quiz result
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Pass status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results && results.length > 0 ? (
                      results.map((item, index) => (
                        <tr key={item.job_id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 ">{item.user_id}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 "> {item.full_name}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 ">
                              {item.gender === "o" ? (
                                <p className="text-gray-900 ">male</p>
                              ) : (
                                <p className="text-gray-900">female</p>
                              )}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 ">{item.date_birh}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 ">
                              {item.phone_number}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                            <p className="text-gray-900 ">{item.email}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                            <p className="text-gray-900 ">{item.cv_file}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                            <p className="text-gray-900 ">{item.cv_score}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                            <div className="group inline-block relative">
                              <button className="bg-gray-300 cursor-pointer  text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                <span className="mr-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </span>
                              </button>

                              <div className=" w-max absolute hidden -top-16 -left-16  text-gray-700 z-50 pt-1 group-hover:block">
                                <div className="flex items-center justify-between">
                                  <div className="px-3 py-3 mx-1 bg-yellow-300 rounded-lg">
                                    <h3 className="text-center font-bold text-sm whitespace-no-wrap ">
                                      Aptitude Score
                                    </h3>
                                    <p className="text-gray-700 text-xs font-bold">
                                      {item.aptitude_score[0].type_name} :{" "}
                                      <span>
                                        {item.aptitude_score[0].score}
                                      </span>
                                    </p>
                                    <p className="text-gray-700 text-xs  font-bold">
                                      {item.aptitude_score[1].type_name} :{" "}
                                      <span>
                                        {item.aptitude_score[1].score}
                                      </span>
                                    </p>
                                    <p className="text-gray-700 text-xs  font-bold">
                                      {item.aptitude_score[2].type_name} :{" "}
                                      <span>
                                        {item.aptitude_score[2].score}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="px-3 py-3 mx-1 bg-green-400 rounded-lg">
                                    <h3 className="text-center font-bold text-sm whitespace-no-wrap ">
                                      Personality Score
                                    </h3>
                                    <p className="text-gray-700 text-xs font-bold">
                                      {item.personality_score[0].type_name} :{" "}
                                      <span>
                                        {item.personality_score[0].score}
                                      </span>
                                    </p>
                                    <p className="text-gray-700 text-xs  font-bold">
                                      {item.personality_score[1].type_name} :{" "}
                                      <span>
                                        {item.personality_score[1].score}
                                      </span>
                                    </p>
                                    <p className="text-gray-700 text-xs  font-bold">
                                      {item.personality_score[2].type_name} :{" "}
                                      <span>
                                        {item.personality_score[2].score}
                                      </span>
                                    </p>
                                    <p className="text-gray-700 text-xs  font-bold">
                                      {item.personality_score[3].type_name} :{" "}
                                      <span>
                                        {item.personality_score[3].score}
                                      </span>
                                    </p>
                                    <p className="text-gray-700 text-xs  font-bold">
                                      {item.personality_score[4].type_name} :{" "}
                                      <span>
                                        {item.personality_score[4].score}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                            <p className="text-gray-900 ">
                              {item.pass_status == "1" ? (
                                <p className="text-green-400 font-black">
                                  PASS
                                </p>
                              ) : (
                                <p className="text-red-500 font-black">
                                  FAILED
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
                          className="px-5 py-5 text-center border-b border-gray-200 bg-white text-sm "
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
