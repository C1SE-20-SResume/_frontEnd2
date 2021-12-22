import React, {useState, useEffect} from "react";
import CreatableSelect from "react-select/creatable";
import {ActionMeta, OnChangeValue} from "react-select";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

function AddJob({userInfo}) {
  const [cookies, setCookie] = useCookies(["user"]);
  const [user, setUser] = useState({...userInfo});

  let options = [
    {
      value: "java",
      label: "java",
    },
    {
      value: "c",
      label: "c",
    },
    {
      value: "c#",
      label: "c#",
    },
    {
      value: "c++",
      label: "c++",
    },
    {
      value: "dart",
      label: "dart",
    },
    {
      value: "php",
      label: "php",
    },
    {
      value: "ruby",
      label: "ruby",
    },
    {
      value: "python",
      label: "python",
    },
  ];

  const [job, setJob] = useState({
    job_title: "",
    job_descrip: "",
    job_require: "",
    job_benefit: "",
    job_place: "",
    salary: "",
    date_expire: "",
    job_keyword: [],
    work_time: "f",
  });

  const [listKey, setListKey] = useState([
    {
      keyword: "",
      weight: "1",
    },
  ]);

  const [listWeight, setListWeight] = useState([
    {id: 1, name: "Very Low"},
    {id: 2, name: "Low"},
    {id: 3, name: "Medium"},
    {id: 4, name: "High"},
    {id: 5, name: "Very High"},
  ]);

  useEffect(() => {
    if (userInfo.info) {
      setUser({
        ...userInfo,
      });
    }
  }, [userInfo]);

  const addKeyword = (e) => {
    e.preventDefault();
    if (listKey.length >= 10) {
      toast.error("You can only add 10 keywords");
      return;
    }
    setListKey([...listKey, {keyword: "", weight: ""}]);
  };

  const removeKeyword = (index) => {
    let newListKey = [...listKey];
    newListKey.splice(index, 1);
    setListKey(newListKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("job_title", job.job_title);
    form.append("job_descrip", job.job_descrip);
    form.append("job_require", job.job_require);
    form.append("job_benefit", job.job_benefit);
    form.append("job_place", job.job_place);
    form.append("salary", job.salary);
    form.append("date_expire", job.date_expire);
    form.append("job_keyword", JSON.stringify(listKey));
    form.append("work_time", job.work_time);

    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/job/add?api_token=${cookies.user}`,
      {
        method: "POST",
        body: form,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);

          setJob({
            job_title: "",
            job_descrip: "",
            job_require: "",
            job_benefit: "",
            job_place: "",
            salary: "",
            date_expire: "",
            job_keyword: [],
            work_time: "f",
          });
          console.log(job);
        } else {
          toast.error("Please fill all  input field");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("check value");
      });
  };

  return (
    <div className="m-2 relative menu-func-recruiter">
      <h2 className="text-xl mb-4">
        <span className="font-bold">{user.info.company_name}</span>
        {` - `}
        <span className="font-bold">Add New Job</span>
      </h2>
      <hr />
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4" id="formAdd">
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Job Title</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Job Title"
              value={job.job_title}
              onChange={(e) => {
                setJob({...job, job_title: e.target.value});
              }}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Job Require</label>
            <textarea
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={job.job_require}
              placeholder="Job Require"
              onChange={(e) => {
                setJob({...job, job_require: e.target.value});
              }}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">
              Job Description
            </label>
            <textarea
              rows={10}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Job Description"
              value={job.job_descrip}
              onChange={(e) => {
                setJob({...job, job_descrip: e.target.value});
              }}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Job Benefit</label>
            <textarea
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Job Benefit"
              value={job.job_benefit}
              onChange={(e) => {
                setJob({...job, job_benefit: e.target.value});
              }}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Job Place</label>
            <input
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Job Place"
              value={job.job_place}
              onChange={(e) => {
                setJob({...job, job_place: e.target.value});
              }}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Job Salary</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder=" Salary (Dollar $)"
              value={job.salary}
              onChange={(e) => {
                setJob({...job, salary: e.target.value});
              }}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Date Expire</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              value={job.date_expire}
              onChange={(e) => {
                setJob({...job, date_expire: e.target.value});
              }}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Work Time</label>
            <select
              className="w-full p-2 rounded-md"
              value={job.work_time}
              onChange={(e) => {
                console.log();
                setJob({...job, work_time: e.target.value});
              }}
            >
              <option value="f">Full Time</option>
              <option value="p">Part Time</option>
            </select>
          </div>
          {listKey.map((item, index) => (
            <div key={index} className="col-span-2">
              <div className="flex items-end justify-between">
                <div className="w-5/12 mr-2">
                  <label className="block text-sm font-bold mb-2">
                    Keyword
                  </label>
                  <CreatableSelect
                    onChange={(newValue, acitonMeta) => {
                      setListKey(
                        listKey.map((item, i) => {
                          if (index === i) {
                            return {...item, keyword: newValue.value};
                          }
                          return item;
                        })
                      );
                    }}
                    options={options}
                  />
                </div>
                <div className="w-5/12 ml-2">
                  <label className="block text-sm font-bold mb-2">Weight</label>
                  <select
                    className="w-full p-2 rounded-md"
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
                    }}
                  >
                    {listWeight.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-2/12 ml-2">
                  <button
                    className="hover:text-prihover hover:scale-110 mb-3 mx-2"
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
                      className="hover:text-red-500 hover:scale-110 mb-3 mx-2"
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
        </div>
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
