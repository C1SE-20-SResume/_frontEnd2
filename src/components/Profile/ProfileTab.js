import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
function ProfileTab({user}) {
  const [cookies, setCookie] = useCookies(["user"]);
  const {register, handleSubmit, errors} = useForm();
  const [showApti, setShowApti] = useState(false);
  const [showPer, setShowper] = useState(false);
  const onSubmit = (data) => {
    console.log(data);

    let form = new FormData();
    form.append("full_name", data.fullname);
    form.append("gender", data.gioitinh);
    form.append("date_birth", data.birthday);
    form.append("phone_number", data.phone_number);
    form.append("company_name", data.companyname);
    form.append("logo_url", data.logourl);

    fetch(
      `${process.env.REACT_APP_API_URL}/user/profile?api_token=${cookies.user}`,
      {
        method: "POST",
        body: form,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" relative m-2 menu-func-recruiter ">
      <h2 className="text-xl mb-4">
        <span className="font-bold">Profile</span>
      </h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-1 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Your Name"
              name="fullname"
              defaultValue={user.info.full_name}
              ref={register}
            />
          </div>
          {user.info.company_name ? (
            <>
              <div className="col-span-1 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Company Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="company name"
                  name="companyname"
                  defaultValue={user.info.company_name}
                  ref={register}
                />
              </div>
              <div className="col-span-1 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Url logo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="company name"
                  name="logourl"
                  defaultValue={user.info.logo_url}
                  ref={register}
                />
              </div>
              <div className=" flex justify-center col-span-1 mb-4">
                <img
                  className="w-36 border-black border-collapse"
                  src={user.info.logo_url}
                  alt=""
                />
              </div>
            </>
          ) : (
            ""
          )}

          <div className="col-span-1 2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              defaultValue={user.info.email}
              ref={register}
              disabled
            />
          </div>
          <div className="col-span-1 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="phone_number"
              ref={register}
              defaultValue={user.info.phone_number}
            />
          </div>
          <div className="col-span-1 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Birthday
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="birthday"
              ref={register}
              defaultValue={user.info.date_birth}
            />
          </div>
          <div className="col-span-1 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              ref={register}
              name="gioitinh"
              defaultValue={user.info.gender}
              className="w-full p-2 rounded-md "
            >
              <option value="f">Female</option>
              <option value="m">Male</option>
              <option value="o">Another</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 border border-indigo-600  hover:bg-white hover:text-indigo-600 text-white font-bold rounded-lg"
          >
            <span className="font-bold ">Update</span>
          </button>
        </div>
      </form>

      {user.role === 0 && (
        <>
          <hr />
          <div className="mt-5">
            <h3 className="text-lg">
              <span className="font-bold">Table Score</span>
            </h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pb-3">
                    <span className="font-bold">Type</span>
                  </th>
                  <th className="pb-3">
                    <span className="font-bold">Score</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="px-3 py-2">
                    <span className="font-bold">Aptitude Score</span>
                  </td>
                  <td className="text-right relative">
                    <span
                      className={`${
                        !user.info.aptitude_score && "text-red-500"
                      }`}
                    >
                      {user.info.aptitude_score
                        ? user.info.aptitude_score
                        : NaN}
                    </span>
                    {showApti ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 inline-block p-1 cursor-pointer text-red-500"
                          fill="none"
                          onClick={(e) => setShowApti(false)}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                        <table className="w-full absolute -top-24 rounded-xl bg-gray-300 text-center table-collapse">
                          <thead>
                            <tr>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                Maths
                              </th>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                English
                              </th>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                Programing
                              </th>
                            </tr>
                          </thead>
                          <tbody className="align-baseline text-center">
                            <tr className="group text-center cursor-pointer hover:bg-grey-lightest">
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {user.info.aptitude_graph["maths"]}
                              </td>
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {user.info.aptitude_graph["english"]}
                              </td>
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {user.info.aptitude_graph["programing"]}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block p-1 cursor-pointer text-indigo-600"
                        fill="none"
                        onClick={(e) => setShowApti(true)}
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
                    )}
                  </td>
                </tr>

                <tr className="border border-t-0">
                  <td className="px-3 py-2">
                    <span className="font-bold">Personality Score</span>
                  </td>
                  <td className="text-right relative">
                    <span
                      className={`${
                        !user.info.personality_score && "text-red-500"
                      }`}
                    >
                      {user.info.personality_score
                        ? user.info.personality_score
                        : NaN}
                    </span>
                    {showPer ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 inline-block p-1 cursor-pointer text-red-500"
                          fill="none"
                          onClick={(e) => setShowper(false)}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                        <table className="w-full absolute -bot-24 -right-12  rounded-xl bg-gray-300 text-center table-collapse">
                          <thead>
                            <tr>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                openness
                              </th>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                conscientiousness
                              </th>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                extraversion
                              </th>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                agreeableness
                              </th>
                              <th className="text-sm text-center text-left uppercase font-semibold text-grey-darker p-3 bg-grey-light">
                                neuroticism
                              </th>
                            </tr>
                          </thead>
                          <tbody className="align-baseline text-center">
                            <tr className="group text-center cursor-pointer hover:bg-grey-lightest">
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {user.info.personality_graph["openness"]}
                              </td>
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {
                                  user.info.personality_graph[
                                    "conscientiousness"
                                  ]
                                }
                              </td>
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {user.info.personality_graph["extraversion"]}
                              </td>
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {user.info.personality_graph["agreeableness"]}
                              </td>
                              <td className="text-sm text-center p-3 border-t border-grey-light whitespace-no-wrap">
                                {user.info.personality_graph["neuroticism"]}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block p-1 cursor-pointer text-indigo-600"
                        fill="none"
                        onClick={(e) => setShowper(true)}
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
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileTab;
