import React from "react";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
function PasswordTab({user}) {
  const [cookies, setCookie] = useCookies(["user"]);
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = (data) => {
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
    <div className="m-2">
      <h2 className="text-xl mb-4">
        <span className="font-bold">Change Password</span>
      </h2>
      <hr />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-6">
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
                    value: 8,
                    message: "Password shouldn't be shorter than 8 characters",
                  },
                })}
              />
              {errors.currentPassword && (
                <span className="text-red-500 text-xs" id="errors-msg-register">
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
                    value: 8,
                    message: "Password shouldn't be shorter than 8 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-xs" id="errors-msg-register">
                  {errors.newPassword?.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 border border-blue-500  hover:bg-white hover:text-blue-500 text-white font-bold rounded-lg"
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
