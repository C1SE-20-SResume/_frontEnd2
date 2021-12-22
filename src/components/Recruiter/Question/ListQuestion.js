import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";

function ListQuestion() {
  const [cookies, setCookie] = useCookies(["user"]);

  const [info, setInfo] = useState({});

  const [option, setOption] = useState("aptitude");

  const [aptitude, setAptitude] = useState([]);

  const [personality, setPersonality] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/recruiter/ques/view?api_token=${cookies.user}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAptitude(data.aptitude);
          setPersonality(data.personality);
          setInfo({
            company_name: data.company_name,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [cookies.user]);
  const onDelete = (id) => {
    const check = window.confirm("Are you sure you want to delete this job?");
    if (check) {
      alert("ok");
      fetch(
        `${process.env.REACT_APP_API_URL}/recruiter/ques/delete/${id}?api_token=${cookies.user}`
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
      <div className="menu-func-recruiter m-2 relative">
        <h2 className="text-xl mb-4">
          <span className="font-bold">
            {info.company_name ? info.company_name : "Loading..."}
          </span>
          {` - `}
          <span className="font-bold">List Question</span>
        </h2>
        <hr />
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-1 text-center">
              <button
                className={`${
                  option === "aptitude"
                    ? "text-white bg-blue-500"
                    : "text-blue bg-white"
                }  py-2 px-4 rounded-lg`}
                onClick={() => setOption("aptitude")}
              >
                <span className="text-base font-bold">Aptitude</span>
              </button>
            </div>
            <div className="col-span-1 text-center">
              <button
                className={`${
                  option === "personality"
                    ? "text-white bg-blue-500"
                    : "text-blue bg-white"
                }  py-2 px-4 rounded-lg`}
                onClick={() => setOption("personality")}
              >
                <span className="text-base font-bold">Personality</span>
              </button>
            </div>
          </div>
          <table className="menu-func-recruiter table-auto w-full">
            <thead>
              <tr>
                <th className="w-1/5 border px-4 py-2">Type Question</th>
                <th className="border px-4 py-2">Question Content</th>

                <th className="w-2/12 border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {option === "aptitude"
                ? aptitude &&
                  aptitude.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 capitalize">
                        {item.type_name}
                      </td>
                      <td className="border px-4 py-2">{item.ques_content}</td>

                      <td className="border px-4 py-2">
                        <button className="hover:text-prihover mx-1 hover:scale-110">
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

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDelete(item.ques_id);
                          }}
                          className="hover:text-red-500 mx-1 hover:scale-110"
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
                      </td>
                    </tr>
                  ))
                : personality &&
                  personality.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 capitalize">
                        {item.type_name}
                      </td>
                      <td className="border px-4 py-2">{item.ques_content}</td>

                      <td className="border px-4 py-2">
                        <button className="hover:text-prihover mx-1 hover:scale-110">
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

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDelete(item.ques_id);
                          }}
                          className="hover:text-red-500 mx-1 hover:scale-110"
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
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListQuestion;
