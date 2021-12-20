import React from "react";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
function PasswordTab({user}) {
  const [cookies, setCookie] = useCookies(["user"]);
  const {register, handleSubmit, errors, getValues} = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch(
      `${process.env.REACT_APP_API_URL}/password/change?api_token=${cookies.user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: data.currentPassword,
          new_password: data.newPassword,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" menu-func-recruiter  m-2">
      <h2 className="text-xl mb-4">
        <span className="font-bold">Change Password</span>
      </h2>
      <hr />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center   mb-6">
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Current Password"
                ref={register({
                  required: "Current password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />

              {errors.currentPassword && (
                <span
                  className="text-red-500 block text-xs"
                  id="errors-msg-register"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.currentPassword?.message}
                </span>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                ref={register({
                  required: "Current password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <span
                  className="text-red-500 block text-xs"
                  id="errors-msg-register"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.newPassword?.message}
                </span>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="confirmPass"
                id="confirmPass"
                placeholder="New Password"
                ref={register({
                  required: "confirm password is required",
                  minLength: {
                    value: 6,
                    message: "Password shouldn't be shorter than 6 characters",
                  },
                  validate: {
                    checkPasswordConfirmtionHandler: (value) => {
                      const {newPassword} = getValues();
                      return (
                        newPassword === value || "The passwords do not match"
                      );
                    },
                  },
                })}
              />
              {errors.confirmPass && (
                <span
                  className="text-red-500 block text-xs"
                  id="errors-msg-register"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.confirmPass?.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600  border border-indigo-600  hover:bg-white hover:text-indigo-600 text-white font-bold rounded-lg"
            >
              <span className="font-bold">Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordTab;
