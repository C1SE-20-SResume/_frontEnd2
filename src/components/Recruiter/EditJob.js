import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import Dialog from "../../pages/Dialog";

import EditJobDetail from "./EditJobDetail";

function EditJob() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [job, setJob] = useState({});

  const [showDetail, setShowDetail] = useState(false);

  const [idJob, setIdJob] = useState("");
  const [showTaskDialog, setShowTaskdialog] = useState(false);
  const confirm = () => {
    console.log("abc");

    return;
  };
  const cancel = () => {
    setShowTaskdialog(false);
    return;
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/job/view?api_token=${cookies.user}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJob({
            company_name: data.company_name,
            listJob: data.data,
          });
          console.log("check", data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [cookies.user]);

  const handleDetroyJob = (id) => {
    const check = window.confirm("Are you sure you want to close this job?");
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
      {/* <div
        onClick={() => {
          setShowTaskdialog(true);
        }}
        className="text-white bg-blue-400 px-4 py-2 rounded-lg mx-2 hover:bg-blue-600"
      >
        BUTTON
      </div> */}
      <div className="m-2 relative menu-func-recruiter">
        <h2 className="text-xl mb-4">
          <span className="font-bold">
            {job.company_name ? job.company_name : "Loading..."}
          </span>
          {` - `}
          <span className="font-bold">List Job</span>
        </h2>
        <hr />
        {!showDetail ? (
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
                    <tr key={item.id}>
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
                            setIdJob(item.id);
                            setShowDetail(true);
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
                              handleDetroyJob(item.id);
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
        ) : (
          <EditJobDetail setShowDetail={setShowDetail} id={idJob} />
        )}
        <Dialog
          show={showTaskDialog}
          title="Delete"
          description="Are you sure you want to delete ?"
          confirm={confirm}
          cancel={cancel}
        />
      </div>
    </>
  );
}

export default EditJob;
