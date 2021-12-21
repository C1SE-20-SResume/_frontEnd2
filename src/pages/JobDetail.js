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
    window.scrollTo(0, 0);
    fetch(`${process.env.REACT_APP_API_URL}/job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let value = JSON.stringify(data.data);
          let a = value.replace("team", "sasasasafsa");
          console.log(a);
          setJob(data.data);

          console.log(data.data);
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
          toast.error(data.message);
          // window.location.reload();
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

  const renderDescription = () => {
    const des = JSON.stringify(job.job_descrip);
    const des_array = des ? des.split("\\n") : [];
    return des_array.map((description, index) => {
      if (index === 0) {
        return <div>{description.slice(1, description.length)}</div>;
      } else if (index === des_array.length - 1) {
        return <div>{description.slice(0, description.length - 1)}</div>;
      }
      return <div>{description}</div>;
    });
  };
  const renderBenefit = () => {
    const ben = JSON.stringify(job.job_benefit);
    const ben_array = ben ? ben.split("\\n") : [];
    return ben_array.map((benefit, index) => {
      if (index === 0) {
        return <div>{benefit.slice(1, benefit.length)}</div>;
      } else if (index === ben_array.length - 1) {
        return <div>{benefit.slice(0, benefit.length - 1)}</div>;
      }
      return <div>{benefit}</div>;
    });
  };
  const renderRequire = () => {
    const req = JSON.stringify(job.job_benefit);
    const req_array = req ? req.split("\\n") : [];
    return req_array.map((require, index) => {
      if (index === 0) {
        return <div>{require.slice(1, require.length)}</div>;
      } else if (index === req_array.length - 1) {
        return <div>{require.slice(0, require.length - 1)}</div>;
      }
      return <div>{require}</div>;
    });
  };

  return (
    <main>
      <section className="py-10 ">
        <div className="container ">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-4 font-bold">
              <span className="text-indigo-600">Job</span> Detail
            </h2>
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
                    <h3 className="capitalize font-black text-lg">
                      {job.job_title}
                    </h3>
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span title="company name" className="font-medium">
                        {job.company_name}
                      </span>
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
                      <span title="place" className="font-medium">
                        {job.job_place}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mb-4">
                    <h4 className="mb-4">
                      <span className="font-semibold text-lg ">
                        Job Description
                      </span>
                    </h4>
                    <p className="text-sm leading-6 ">{renderDescription()}</p>
                  </div>
                  <div className="mb-4 ">
                    <h4 className="mb-4">
                      <span className="font-semibold text-lg ">
                        Job Benefit
                      </span>
                    </h4>
                    <p className="text-sm leading-6 ">{renderBenefit()}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-4">
                      <span className="font-semibold text-lg ">
                        Job Require{" "}
                      </span>
                    </h4>
                    <p className="text-sm leading-6  ">{renderRequire()}</p>
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
                    <span title="salary" className="flex-grow text-center">
                      {job.salary}$
                    </span>
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
                    <span title="work time" className="flex-grow text-center">
                      {job.work_time === "f" ? "Full-time" : "Part-time"}
                    </span>
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
                    <span title="date update" className="flex-grow text-center">
                      {Math.floor(
                        (new Date() - new Date(job.updated_at)) /
                          (1000 * 60 * 60 * 24)
                      ) +
                        1 +
                        " days ago"}
                    </span>
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span title="date expire" className="flex-grow text-center">
                      {job.date_expire}
                    </span>
                  </div>
                </div>

                {showResult && (
                  <div className="animationForresult w-screen h-screen  relative ">
                    <div className=" shadow-md animationForresult fixed  w-9/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                        <div className="m-8 w-full">
                          <div className="text-sm flex justify-between  font-medium text-gray-500">
                            <p>keywords was found: </p>
                            <span>{getresult.keyword_found + ""}</span>
                          </div>
                          <div className="text-sm flex justify-between   font-medium text-gray-500">
                            <p>keywords not found:</p>
                            <span>{getresult.keyword_not_found}</span>
                          </div>
                          <div className="text-sm flex justify-between   font-medium text-gray-500">
                            <p>Score :</p>
                            <span>{getresult.cv_score}</span>
                          </div>
                          <div className=" text-sm flex justify-between  font-medium text-gray-500">
                            <p>Rank:</p>
                            <span>{getresult.rank}</span>
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
                  Upload CV{" "}
                  <span className="text-xs font-light">
                    (Only accept files with English language )
                  </span>
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  placeholder="Upload CV"
                  onChange={(e) => handleUploadCV(e, true)}
                />
                <span className="text-xs">
                  (*txt, doc, docx, pdf, png, jpg, jpeg*)
                </span>
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
