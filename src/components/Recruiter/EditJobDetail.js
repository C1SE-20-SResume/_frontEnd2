import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import CreatableSelect from "react-select/creatable";
import {ActionMeta, OnChangeValue} from "react-select";
function EditJobDetail({setShowDetail, id}) {
  const [cookies, setCookie] = useCookies(["user"]);

  const [jobEdit, setJobEdit] = useState({});

  const [listKey, setListKey] = useState([
    {
      keyword: "",
      weight: "",
    },
  ]);
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
  const [listWeight] = useState([
    {id: 1, name: "Very Low"},
    {id: 2, name: "Low"},
    {id: 3, name: "Medium"},
    {id: 4, name: "High"},
    {id: 5, name: "Very High"},
  ]);

  const addKeyword = (e) => {
    e.preventDefault();
    if (listKey.length >= 10) {
      alert("You can only add 10 keywords");
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
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
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
  }, [id]);
  return (
    <div className="menu-func-recruiter mt-6">
      <div className="mb-2">
        <button
          className="hover:translate-x-1"
          onClick={() => setShowDetail(false)}
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </button>
      </div>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Job Title</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="job_title"
              value={jobEdit.job_title}
              onChange={(e) =>
                setJobEdit({...jobEdit, job_title: e.target.value})
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Job Require</label>
            <textarea
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="job_require"
              value={jobEdit.job_require}
              onChange={(e) =>
                setJobEdit({...jobEdit, job_require: e.target.value})
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">
              Job Description
            </label>
            <textarea
              rows={10}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="job_description"
              value={jobEdit.job_descrip}
              onChange={(e) =>
                setJobEdit({...jobEdit, job_descrip: e.target.value})
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2">Job Benefit</label>
            <textarea
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="job_benefit"
              value={jobEdit.job_benefit}
              onChange={(e) =>
                setJobEdit({...jobEdit, job_benefit: e.target.value})
              }
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Job Place</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="job_place"
              value={jobEdit.job_place}
              onChange={(e) =>
                setJobEdit({...jobEdit, job_place: e.target.value})
              }
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Job Salary</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="job_salary"
              value={jobEdit.salary}
              onChange={(e) => setJobEdit({...jobEdit, salary: e.target.value})}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Date Expire</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="date_expire"
              defaultValue={
                jobEdit.date_expire
                  ? new Date(jobEdit.date_expire).toISOString().substr(0, 10)
                  : ""
              }
              onChange={(e) =>
                setJobEdit({...jobEdit, date_expire: e.target.value})
              }
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-bold mb-2">Work time</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="date_expire"
              defaultValue="Fulltime"
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
                      value={{
                        value: `${item.keyword}`,
                        label: `${item.keyword}`,
                      }}
                      options={options}
                    />
                    {/* <select
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
                      <option value="java" className="capitalize">
                        javascript
                      </option>
                      <option value="php" className="capitalize">
                        php
                      </option>
                      <option value="python" className="capitalize">
                        python
                      </option>
                      <option value="python" className="capitalize">
                        ruby
                      </option>
                      <option value="python" className="capitalize">
                        sql
                      </option>
                      <option value="swift" className="capitalize">
                        swift
                      </option>
                      <option value="c#" className="capitalize">
                        c#
                      </option>
                      <option value="c" className="capitalize">
                        C
                      </option>
                      <option value="c++" className="capitalize">
                        C++
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
                      <option value="asp.net" className="capitalize">
                        asp.net
                      </option>
                      <option value=".net" className="capitalize">
                        .net
                      </option>
                      <option value="react native" className="capitalize">
                        react native
                      </option>
                      <option value="flutter" className="capitalize">
                        flutter
                      </option>
                      <option value="kotlin" className="capitalize">
                        kotlin
                      </option>
                      <option value="golang" className="capitalize">
                        golang
                      </option>
                      <option value="Django" className="capitalize">
                        Django
                      </option>
                      <option value="html" className="capitalize">
                        html
                      </option>
                      <option value="css" className="capitalize">
                        css
                      </option>
                      <option value="tailwind" className="capitalize">
                        tailwind
                      </option>
                      <option value="bootstrap" className="capitalize">
                        bootstrap
                      </option>
                    </select> */}
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
                      }}
                    >
                      <option
                        value={item.weight || "---"}
                        className="capitalize"
                      >
                        {item.weight !== ""
                          ? listWeight.filter((i) => i.id === item.weight)[0]
                              .name
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
          <div className="col-span-2 text-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditJobDetail;
