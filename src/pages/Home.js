import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Loader from "./Loader";

function Home({role, title}) {
  const [listJob, setListJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentInfo, setCurrentInfo] = useState([]);

  const onTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetch(`${process.env.REACT_APP_API_URL}/popularjob`)
      .then((res) => res.json())
      .then((data) => {
        setListJob(data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/statistic`)
      .then((res) => res.json())
      .then((result) => {
        setCurrentInfo(result);
        console.log(result);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);
  let [color, setColor] = useState("#0A73EF");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main>
          <section className="py-10 relative  gradient ">
            <div className="container z-0 mb-5">
              <div className="carousel relative z-0 shadow-2xl bg-white">
                <div className="carousel-inner relative overflow-hidden w-full">
                  <input
                    className="carousel-open"
                    type="radio"
                    id="carousel-1"
                    name="carousel"
                    aria-hidden="true"
                    hidden
                    defaultChecked="checked"
                  />
                  <div
                    className="carousel-item absolute opacity-0"
                    style={{height: "50vh"}}
                  >
                    <div className="block h-full w-full bg-transparent text-white text-5xl text-center">
                      <img
                        src="https://devforum.info/uploads/tuyendung/cong-tac-vien-seo_optimized.png"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="carousel-3"
                    className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-indigo-600 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
                  >
                    ‹
                  </label>
                  <label
                    htmlFor="carousel-2"
                    className="animate-ping next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-indigo-600 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
                  >
                    ›
                  </label>

                  <input
                    className="carousel-open"
                    type="radio"
                    id="carousel-2"
                    name="carousel"
                    aria-hidden="true"
                    hidden
                  />
                  <div
                    className="carousel-item absolute opacity-0"
                    style={{height: "50vh"}}
                  >
                    <div className="block h-full w-full bg-orange-500 text-white text-5xl text-center">
                      <img
                        className="w-full h-full"
                        src="https://vieclam.thegioididong.com/uploads/img/job/51/tuyendung.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="carousel-1"
                    className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-indigo-600 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
                  >
                    ‹
                  </label>
                  <label
                    htmlFor="carousel-3"
                    className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-indigo-600 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
                  >
                    ›
                  </label>

                  <input
                    className="carousel-open"
                    type="radio"
                    id="carousel-3"
                    name="carousel"
                    aria-hidden="true"
                    hidden
                  />
                  <div
                    className="carousel-item absolute opacity-0"
                    style={{height: "50vh"}}
                  >
                    <div className="block h-full w-full bg-green-500 text-white text-5xl text-center">
                      <img
                        src="https://isa.com.vn/wp-content/uploads/2021/04/nhan-vien-he-thong-it.jpg"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="carousel-2"
                    className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-indigo-600 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
                  >
                    ‹
                  </label>
                  <label
                    htmlFor="carousel-1"
                    className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-indigo-600 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
                  >
                    ›
                  </label>

                  <ol className="carousel-indicators">
                    <li className="inline-block mr-3">
                      <label
                        htmlFor="carousel-1"
                        className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-indigo-600"
                      >
                        •
                      </label>
                    </li>
                    <li className="inline-block mr-3">
                      <label
                        htmlFor="carousel-2"
                        className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-indigo-600"
                      >
                        •
                      </label>
                    </li>
                    <li className="inline-block mr-3">
                      <label
                        htmlFor="carousel-3"
                        className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-indigo-600"
                      >
                        •
                      </label>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="text-center mb-6 ">
                <h2 className="text-2xl mb-4 font-bold">
                  Popular <span className="text-indigo-600">Jobs</span>
                </h2>
                <p className="">
                  Here's the most recent job listed on the website.
                </p>
              </div>

              <div className="p-2">
                {listJob.length > 0 &&
                  listJob.map((job) => (
                    <Link to={`/job/${job.job_id}`} key={job.job_id}>
                      <div className="p-6 mb-6 shadow-xl rounded-lg  transition ease-in-out  hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500 hover:text-white duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={job.logo_url}
                              alt="logo company"
                              className="max-w-[80px] min-h-[80px]"
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
                            <li className="p-5 ">
                              <span className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 "
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
                                <span title="place" className="ml-2">
                                  {job.job_place}
                                </span>
                              </span>
                            </li>
                            <li className="p-5">
                              <span className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 "
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
                                <span
                                  title="salary"
                                  title="salary"
                                  className="ml-2"
                                >
                                  {job.salary}$
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
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span title="date expire" className="ml-2">
                                  {
                                    // format date
                                    new Date(
                                      job.date_expire
                                    ).toLocaleDateString("vi-VN")
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
                                <span title="work time" className="ml-2">
                                  Full Time
                                </span>
                              </span>
                            </li>
                            <li className="p-5 ">
                              <span className="flex items-center hover:translate-x-3 transition-all duration-300 hover:text-prihover">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 animate-pulse "
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
                                <span className="ml-2 animate-pulse">
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
                  <button className="py-2 px-6  border-2 text-prihover border-prihover hover:border-prihover hover:bg-prihover hover:text-white transition-all duration-300 rounded-lg uppercase font-semibold">
                    Load More
                  </button>
                </Link>
              </div>
            </div>
            {/* do add */}
            <div className="container my-10">
              <div className="pt-12">
                <h1 className="text-2xl text-center mb-1 font-bold">
                  Tutorial
                </h1>
              </div>
              <p className="text-center font-mono text-sm text-black mb-10">
                Very easy to use
              </p>
              <div className="grid grid-cols-4 gap-4   mx-auto">
                <div>
                  <div className="mb-5  ">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/gradient-circle/36/1014-512.png"
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
                    REGISTER & LOGIN
                  </h3>
                  <span className="block text-center text-black font-normal text-sm">
                    Register and log in to be able to apply for a job at your
                    favorite company.
                  </span>
                </div>
                <div>
                  <div className="mb-5">
                    <img
                      src="https://st2.depositphotos.com/4030657/6391/v/380/depositphotos_63915307-stock-illustration-test-flat-design-icon.jpg"
                      alt=""
                      className="
        w-48
        h-full
        rounded-full
        border-solid border-4 border-indigo-600
        object-cover
        mx-auto
      "
                    />
                  </div>
                  <h3 className="text-center font-medium text-lg mb-3">
                    TEST QUIZ
                  </h3>
                  <span className="block text-center text-black font-normal text-sm">
                    After logging in to the site, take the quiz. The results of
                    the quiz will give you a score on your personality and
                    aptitude.
                  </span>
                </div>
                <div>
                  <div className="mb-5">
                    <img
                      src="https://previews.123rf.com/images/dacianlogan/dacianlogan1404/dacianlogan140400060/27843694-vector-newspaper-icon.jpg"
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
                  <span className="block text-center text-black font-normal text-sm">
                    After taking the test, look at the jobs that employers have
                    posted and choose the one you think is suitable.
                  </span>
                </div>
                <div>
                  <div className="mb-5">
                    <img
                      src="https://png.pngtree.com/png-vector/20190328/ourlarge/pngtree-vector-checklist-icon-png-image_872203.jpg"
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
                  <span className="block text-center text-black font-normal text-sm">
                    Please prepare a CV file format as .dox , .pdf , .png
                    ....... to apply to the company you want.
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="container">
              <div className="text-center mb-6">
                <h2 className="text-2xl mb-1 font-bold ">TESTIMONIALS</h2>
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
                                <h2 className="text-white mb-1">
                                  Ollie McBride
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
                                  <h2 className="text-white mb-1">
                                    Luke Nunez
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
                                  <h2 className="text-white mb-1">
                                    Chris Sonne
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
                                  <h2 className="text-white mb-1">
                                    Chris Sonne
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
                                  <h2 className="text-white mb-1">
                                    Chris Sonne
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
                                  <h2 className="text-white mb-1">
                                    Chris Sonne
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
                                  <h2 className="text-white mb-1">
                                    Chris Sonne
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
                    </div>
                    <div className="text-center">
                      <button className="border border-gray-600 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-600 hover:text-white">
                        Show More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="statistic animationStatistic fixed top-1/2 transform bg-white   w-max p-1  shadow-xl rounded-tr-xl rounded-br-xl flex flex-col items-center justify-center ">
              <div className="">
                <div className="mb-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1 text-black  inline-block"
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
                  <span className="inline-block text-center text-black text-sm">
                    {currentInfo.company_count}
                  </span>
                  <p className="text-xs text-center text-black">Company</p>
                </div>
                <div className="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1 text-black  inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="inline-block text-sm text-black">
                    {currentInfo.user_count}
                  </span>
                  <p className="text-xs text-center text-black">User</p>
                </div>
                <div className="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1 text-black  inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span className="inline-block text-sm text-black">
                    {currentInfo.job_count}
                  </span>
                  <p className="text-xs text-center text-black">Jobs</p>
                </div>
                <div className="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1 text-black  inline-block"
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
                  <span className="inline-block text-sm text-black">
                    {currentInfo.apply_count}
                  </span>
                  <p className="text-xs text-center text-black">Application</p>
                </div>
              </div>
            </div>
          </section>
          <button
            onClick={onTop}
            className="fixed  bottom-2 right-10 rounded-xl p-3 bg-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-1 text-white font-bold animate-bounce text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              />
            </svg>
          </button>
        </main>
      )}
    </>
  );
}

export default Home;
