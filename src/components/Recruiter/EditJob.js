import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function EditJob() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [job, setJob] = useState({});

  const [jobEdit, setJobEdit] = useState({});

  const [popupEdit, setPopupEdit] = useState(false);

  const [listKey, setListKey] = useState([
    {
      keyword: "",
      weight: "",
    },
  ]);

  const [listWeight, setListWeight] = useState([
    { id: 1, name: "Very Low" },
    { id: 2, name: "Low" },
    { id: 3, name: "Medium" },
    { id: 4, name: "High" },
    { id: 5, name: "Very High" },
  ]);

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

  const handleEdit = (id) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/job/edit/${id}?api_token=${cookies.user}`
    )
      .then((res) => res.json())
      .then((data) => {
        let date = new Date(data.data.date_expire);

        let date_expire =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        if (data.success) {
          setJobEdit({
            ...data.data,
            date_expire: date_expire,
          });
          data.data.job_keyword.length > 0 && setListKey(data.data.job_keyword);
        }
      })
      .catch((err) => console.log(err));
  };

  const addKeyword = (e) => {
    e.preventDefault();
    if (listKey.length >= 10) {
      alert("You can only add 10 keywords");
      return;
    }
    setListKey([...listKey, { keyword: "", weight: "" }]);
  };

  const removeKeyword = (index) => {
    let newListKey = [...listKey];
    newListKey.splice(index, 1);
    setListKey(newListKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("job_title", jobEdit.job_title);
    form.append("job_descrip", jobEdit.job_descrip);
    form.append("job_require", jobEdit.job_require);
    form.append("job_benefit", jobEdit.job_benefit);
    form.append("job_place", jobEdit.job_place);
    form.append("salary", jobEdit.salary);
    form.append("date_expire", jobEdit.date_expire);
    form.append("job_keyword", JSON.stringify(listKey));

    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/job/update/${jobEdit.job_id}?api_token=${cookies.user}`,
      {
        method: "POST",
        body: form,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setPopupEdit(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDetroyJob = (id) => {
    const check = window.confirm("Are you sure you want to delete this job?");
    if (check) {
      fetch(
        `${process.env.REACT_APP_API_URL}/recruiter/job/close/${id}?api_token=${cookies.user}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            alert(data.message);
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="m-2 relative">
        <h2 className="text-xl mb-4">
          <span className="font-bold">
            {job.company_name ? job.company_name : "Loading..."}
          </span>
          {` - `}
          <span className="font-bold">List Job</span>
        </h2>
        <hr />
        <div className="mt-6">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Job Title</th>
                <th className="border px-4 py-2">Job Place</th>
                <th className="border px-4 py-2">Job Salary</th>
                <th className="border px-4 py-2">Date Expired</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {job && job.listJob && job.listJob.length > 0 ? (
                job.listJob.map((item) => (
                  <tr key={item.job_id}>
                    <td className="border px-4 py-2 capitalize">
                      {item.job_title}
                    </td>
                    <td className="border px-4 py-2">{item.job_place}</td>
                    <td className="border px-4 py-2">${item.salary}</td>
                    <td className="border px-4 py-2">
                      {new Date(item.date_expire).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="hover:text-prihover mx-1 hover:scale-110"
                        onClick={() => {
                          handleEdit(item.job_id);
                          setPopupEdit(true);
                        }}
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
                      </button>
                      {new Date(item.date_expire) < new Date() || (
                        <button
                          className="hover:text-red-500 mx-1 hover:scale-110"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDetroyJob(item.job_id);
                          }}
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {popupEdit && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 z-[99] shadow-lg rounded-lg p-5 overflow-auto">
          <form className="my-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-bold mb-2">
                  Job Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="job_title"
                  value={jobEdit.job_title}
                  onChange={(e) =>
                    setJobEdit({ ...jobEdit, job_title: e.target.value })
                  }
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold mb-2">
                  Job Require
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="job_require"
                  value={jobEdit.job_require}
                  onChange={(e) =>
                    setJobEdit({ ...jobEdit, job_require: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">
                  Job Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="job_description"
                  value={jobEdit.job_descrip}
                  onChange={(e) =>
                    setJobEdit({ ...jobEdit, job_descrip: e.target.value })
                  }
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold mb-2">
                  Job Benefit
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="job_benefit"
                  value={jobEdit.job_benefit}
                  onChange={(e) =>
                    setJobEdit({ ...jobEdit, job_benefit: e.target.value })
                  }
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold mb-2">
                  Job Place
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="job_place"
                  value={jobEdit.job_place}
                  onChange={(e) =>
                    setJobEdit({ ...jobEdit, job_place: e.target.value })
                  }
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold mb-2">
                  Job Salary
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="job_salary"
                  value={jobEdit.salary}
                  onChange={(e) =>
                    setJobEdit({ ...jobEdit, salary: e.target.value })
                  }
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-bold mb-2">
                  Date Expire
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="date_expire"
                  defaultValue={
                    jobEdit.date_expire
                      ? new Date(jobEdit.date_expire)
                          .toISOString()
                          .substr(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setJobEdit({ ...jobEdit, date_expire: e.target.value })
                  }
                />
              </div>
              {listKey.length > 0 &&
                listKey.map((item, index) => (
                  <div key={index} className="col-span-2">
                    <div className="flex items-end justify-between">
                      <div className="w-1/3 mr-2">
                        <label className="block text-sm font-bold mb-2">
                          Keyword
                        </label>
                        <select
                          className="w-full p-2 rounded-md capitalize"
                          name="keyword"
                          onChange={(e) =>
                            setListKey(
                              listKey.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      keyword: e.target.value,
                                    }
                                  : item
                              )
                            )
                          }
                        >
                          <option
                            value={item.keyword || "---"}
                            className="capitalize"
                          >
                            {item.keyword || "Language"}
                          </option>
                          <option value="java" className="capitalize">
                            java
                          </option>
                          <option value="php" className="capitalize">
                            php
                          </option>
                          <option value="python" className="capitalize">
                            python
                          </option>
                          <option value="swift" className="capitalize">
                            swift
                          </option>
                          <option value="c#" className="capitalize">
                            c#
                          </option>
                          <option value="objectC" className="capitalize">
                            object-C
                          </option>
                          <option value="dart" className="capitalize">
                            dart
                          </option>
                          <option value="reactjs" className="capitalize">
                            reactjs
                          </option>
                          <option value="anglular" className="capitalize">
                            anglular
                          </option>
                          <option value="laravel" className="capitalize">
                            laravel
                          </option>
                          <option value="nodejs" className="capitalize">
                            nodejs
                          </option>
                          <option value="vuejs" className="capitalize">
                            vuejs
                          </option>
                        </select>
                      </div>
                      <div className="w-1/3 ml-2">
                        <label className="block text-sm font-bold mb-2">
                          Weight
                        </label>
                        <select
                          className="w-full p-2 rounded-md capitalize"
                          name="weight"
                          onChange={(e) => {
                            setListKey(
                              listKey.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      weight: parseInt(e.target.value),
                                    }
                                  : item
                              )
                            );
                            console.log(listKey);
                          }}
                        >
                          <option
                            value={item.weight || "---"}
                            className="capitalize"
                          >
                            {item.weight !== ""
                              ? listWeight.filter(
                                  (i) => i.id === item.weight
                                )[0].name
                              : "Weight"}
                          </option>
                          {listWeight.map(
                            (i) =>
                              i.id !== item.weight && (
                                <option key={i.id} value={i.id}>
                                  {i.name}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                      <div className="w-1/12 ml-2">
                        <button
                          className="hover:text-prihover hover:scale-110 mb-3"
                          onClick={addKeyword}
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
                        </button>
                        {index > 0 && (
                          <button
                            className="hover:text-red-500 hover:scale-110 mb-3"
                            onClick={(e) => {
                              e.preventDefault();
                              removeKeyword(index);
                            }}
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
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              <div className="col-span-1 text-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              </div>
              <div className="col-span-1 text-center mt-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setPopupEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditJob;
