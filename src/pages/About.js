import React, {Component} from "react";

function About() {
  return (
    <>
      <div className="container">
        <div>
          <div className="px-8 text-gray-900 min-h-screen flex bg-white-200">
            <div className="w-full max-w-screen-lg mx-auto my-8">
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-indigo-600">About</span> us
                </h1>
              </div>

              <section className="my-8">
                <div>
                  <div className="flex flex-wrap justify-around my-4">
                    <div className="m-2">
                      <div className="component flex max-w-sm">
                        <div className="bg-gray-100 shadow-sm rounded-lg">
                          <div
                            className="bg-cover p-8 rounded-t-lg"
                            style={{
                              backgroundImage:
                                'url("https://images.unsplash.com/photo-1556139954-ec19cce61d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80")',
                            }}
                          >
                            <div className="font-semibold text-gray-100 text-lg tracking-wide">
                              #SRESUME 2022
                            </div>
                            <div className="font-black text-gray-100 text-2xl tracking-wide mb-10">
                              {/* Create an account for only 5$ a month */}
                            </div>
                          </div>
                          <div className="px-8 py-6 relative">
                            <div
                              className="absolute top-0 left-0 ml-8 transform -translate-y-1/2 h-20 w-20 bg-cover rounded-full border-2 border-gray-500"
                              style={{
                                backgroundImage:
                                  'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80")',
                              }}
                            />
                            <div className="mt-10 text-sm">
                              <span className="text-gray-500 font-semibold">
                                From
                              </span>{" "}
                              August 08{" "}
                              <span className="text-gray-500 font-semibold">
                                To
                              </span>{" "}
                              Dec 22
                            </div>
                            <div className="mt-6">
                              <div className="uppercase font-bold text-gray-600">
                                Hotline
                              </div>
                              <div className="uppercase mt-2 text-indigo-500 font-black text-2xl leading-none">
                                (+84) 123 456 789
                              </div>
                            </div>
                            <div className="mt-6 text-gray-500 text-sm">
                              Email: support@cvtojob.tk
                            </div>
                          </div>
                          <div>
                            <div className="w-full border border-transparent rounded-b-lg font-semibold tracking-wide px-5 py-4 focus:outline-none focus:shadow-outline bg-indigo-500 text-gray-100 hover:bg-indigo-600 hover:text-gray-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="m-2">
                      <div className="component flex max-w-sm pt-16">
                        <div className="w-full px-8 pb-8 shadow-lg rounded-lg bg-gray-100 text-center relative">
                          <div className="absolute top-0 left-0 right-0 ">
                            <div className="inline-block bg-indigo-200 rounded-full p-8 transform -translate-y-1/2">
                              <svg
                                className="w-6 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x={3}
                                  y={3}
                                  width={18}
                                  height={18}
                                  rx={2}
                                  ry={2}
                                />
                                <line x1={3} y1={9} x2={21} y2={9} />
                                <line x1={9} y1={21} x2={9} y2={9} />
                              </svg>
                            </div>
                          </div>
                          <div className="mt-20 uppercase text-indigo-700 font-bold">
                            About SRESUME
                          </div>
                          <div className="mt-6 text-sm text-gray-600">
                            SResume is a website that allows employers to post
                            information about looking for personnel for their
                            company. Through the quiz test score, the employer
                            will know if the person's personality and skills are
                            needed in the company's department. you or not.
                          </div>
                          <div className="mt-6">
                            {/* <a
                              href="#"
                              className="uppercase font-bold border-b-2 text-indigo-500 border-indigo-200 hover:border-indigo-500 hover:text-indigo-600"
                            >
                              Learn More
                            </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="m-2">
                      <div className="component flex max-w-sm pt-16">
                        <div className="w-full px-12 py-12 shadow-lg rounded-lg bg-gray-100 relative">
                          <div className="text-2xl font-bold text-gray-700 leading-tight">
                            From Duy Tan University
                          </div>
                          <div>
                            <div className="flex mt-6 items-center text-xs font-bold">
                              <svg
                                className="text-gray-400 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx={12} cy={10} r={3} />
                              </svg>
                              <span className="ml-1 text-gray-500">
                                Da Nang, VietNam
                              </span>
                            </div>
                            <div className="mt-16 flex items-center">
                              <div
                                className="w-16 h-16 bg-cover rounded-lg shadow-lg"
                                alt=""
                                style={{
                                  backgroundImage:
                                    'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80")',
                                }}
                              />
                              <div className="ml-5">
                                <div className="font-bold text-gray-800">
                                  C1SE.20
                                </div>
                                <div className="text-xs text-gray-500">
                                  Posted 3 Days ago
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
