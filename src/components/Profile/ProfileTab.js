import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useCookies} from "react-cookie";
function ProfileTab({user}) {
  const [cookies, setCookie] = useCookies(["user"]);
  const {register, handleSubmit, errors} = useForm();

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
    <div className=" m-2 menu-func-recruiter ">
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
                  <td className="text-center">
                    <span
                      className={`${
                        !user.info.aptitude_score && "text-red-500"
                      }`}
                    >
                      {user.info.aptitude_score
                        ? user.info.aptitude_score
                        : NaN}
                    </span>
                  </td>
                </tr>
                <tr className="border border-t-0">
                  <td className="px-3 py-2">
                    <span className="font-bold">Personality Score</span>
                  </td>
                  <td className="text-center">
                    <span
                      className={`${
                        !user.info.personality_score && "text-red-500"
                      }`}
                    >
                      {user.info.personality_score
                        ? user.info.personality_score
                        : NaN}
                    </span>
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
