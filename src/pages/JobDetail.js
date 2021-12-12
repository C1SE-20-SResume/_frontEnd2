import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";
function JobDetail({role}) {
  const {id} = useParams();
  const [cookies] = useCookies(["user"]);

  const [job, setJob] = useState({});

  const [show, setShow] = useState(false);
  const [getresult, setResult] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJob(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    document.title = `${job.job_title} | Job Detail`;
  }, [job.job_title]);

  const handleUploadCV = (e, value) => {
    e.preventDefault();
    e.target.disabled = true;
    const formData = new FormData();
    formData.append("job_id", id);

    if (!value) {
      formData.append("cv_new", value);
    } else {
      formData.append("cv_file", e.target.files[0]);
    }

    fetch(
      `${process.env.REACT_APP_API_URL}/candidate/job/upload?api_token=${cookies.user}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          //  disable button

          setShow(false);
          toast.success("Upload CV Success");
          setResult(data);
          setShowResult(true);
          console.log(data);
        } else {
          alert(data.message);
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };

  const [existCV, setExistCV] = useState(false);

  const checkCV = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/candidate/apply/check?api_token=${cookies.user}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setExistCV(data.applied);
          setShow(true);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <main>
      <section className="py-10 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div className="container ">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-4 font-bold">Job Detail</h2>
            <p>
              Post a job to tell us about your project. We'll quickly match you
              with the right freelancers.
            </p>
          </div>
          <div className="flex">
            <div className="md:w-3/4 w-full mr-5">
              <div className="shadow-md bg-gray-50 p-5 rounded-lg">
                <div className="flex">
                  <div>
                    <img
                      src={job.logo_url}
                      alt={job.company_name}
                      className="max-w-[90px] h-auto"
                    />
                  </div>
                  <div className="ml-5">
                    <h3 className="capitalize text-lg">{job.job_title}</h3>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span>{job.company_name}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
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
                      <span>{job.job_place}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mb-4">
                    <h4>
                      <span className="font-bold">Job Description</span>
                    </h4>
                    <p>{job.job_descrip}</p>
                  </div>
                  <div className="mb-4">
                    <h4>
                      <span className="font-bold">Job Benefit</span>
                    </h4>
                    <p>{job.job_benefit}</p>
                  </div>
                  <div className="mb-4">
                    <h4>
                      <span className="font-bold">Job Require </span>
                    </h4>
                    <p>{job.job_require}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/4 w-full">
              <div className="shadow-md bg-gray-100 p-5 mb-6 rounded-lg">
                <h3 className="text-center">
                  <span className="font-bold">Job Detail</span>
                </h3>
                <div className="mt-4">
                  <div className="flex items-center my-3">
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
                    <span className="flex-grow text-center">{job.salary}$</span>
                  </div>
                  <div className="flex items-center my-3">
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
                    <span className="flex-grow text-center">Full Time</span>
                  </div>
                  <div className="flex items-center my-3">
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    <span className="flex-grow text-center">
                      {Math.floor(
                        (new Date() - new Date(job.updated_at)) /
                          (1000 * 60 * 60 * 24)
                      ) +
                        1 +
                        " days ago"}
                    </span>
                  </div>
                </div>

                {showResult && (
                  <div className="fixed  w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className=" shadow-md">
                      <div
                        className={`${
                          getresult.cv_pass === 1
                            ? "bg-green-400"
                            : "bg-yellow-500"
                        }    text-left rounded-t-xl   p-5`}
                      >
                        <h3 className="font-extrabold text-white text-2xl">
                          {getresult.cv_pass === 1
                            ? "Congratulations!"
                            : "Please be patient !"}{" "}
                        </h3>
                      </div>
                      <div className="p-5 2 bg-white flex flex-col justify-center items-center">
                        {getresult.cv_pass === 1 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 block text-center text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 block text-center text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}

                        <div className="text-center">
                          <h3 className="font-semibold text-lg">
                            {getresult.cv_pass === 1
                              ? "Your CV has been prioritized. Please wait, the recruiter will contact you as soon as possible. Thank you!"
                              : "Your CV has not been prioritized, but don't worry, you wait for the recruiter to contact you as soon as possible. Thank you!"}
                          </h3>
                        </div>
                        <div className="m-8">
                          <div className="text-center font-medium text-gray-500">
                            <p>
                              Rank : <span>{getresult.rank}</span>{" "}
                            </p>
                          </div>
                          <div className="text-center font-medium text-gray-500">
                            <p>
                              Score : <span>{getresult.cv_score}</span>{" "}
                            </p>
                          </div>
                          <div className="text-center font-medium text-gray-500">
                            <p>
                              keyword was found :{" "}
                              <span>{getresult.keyword_found + "  "}</span>{" "}
                            </p>
                          </div>
                        </div>
                        <div className="m-8">
                          <button
                            onClick={() => setShowResult(false)}
                            className="rounded-xl py-2 px-5 bg-red-500 text-center text-white font-medium "
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {role !== 1 && (
                <div className="shadow-md bg-gray-100 p-5">
                  <button
                    className="w-full border border-blue-500 text-black hover:bg-blue-500 hover:text-white font-bold py-3 rounded transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      if (role === 0) {
                        checkCV();
                      } else {
                        alert(
                          "You are not a candidate, login as a candidate to apply this job"
                        );
                      }
                    }}
                  >
                    <span className="font-bold">Apply</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {role === 0 && show && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="z-20 bg-white rounded-lg shadow-xl p-5 min-w-[300px] relative">
            <h3 className="text-center">
              <span className="font-bold text-lg">Apply</span>
            </h3>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload CV
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  placeholder="Upload CV"
                  onChange={(e) => handleUploadCV(e, true)}
                />
                {existCV && (
                  <>
                    <p>Or</p>
                    <button
                      className="w-full border border-blue-500 text-black hover:bg-blue-500 hover:text-white font-bold py-3 rounded transition-all duration-300"
                      onClick={(e) => handleUploadCV(e, false)}
                    >
                      <span className="font-bold">Use existing CV</span>
                    </button>
                  </>
                )}
              </div>
            </div>
            <button
              className="absolute top-0 right-0 m-2 hover:text-prihover"
              onClick={() => setShow(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default JobDetail;
