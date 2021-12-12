import React, {useState} from "react";
import {Link} from "react-router-dom";
import validator from "validator";

function Register() {
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    password: "",
    gender: "f",
    date_birth: "",
    phone_number: "",
  });

  const [validate, setValidate] = useState({
    full_name: true,
    email: true,
    password: true,
    gender: true,
    date_birth: true,
    phone_number: true,
    confirm_password: true,
  });

  const [assetToken, setAssetToken] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let date = e.target.date_birth.value,
      gender = e.target.gender.value;

    setUser((prev) => ({
      ...prev,
      date_birth: date,
      gender: gender,
    }));
    let checkUser = Object.values(user).every((item) => item !== "");

    let checkValidate = Object.values(validate).every((item) => item === true);

    if (checkValidate && checkUser) {
      fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAssetToken(data.access_token);
          }
        })
        .catch((err) => console.log(err));
    } else {
      Object.keys(user).forEach((key) => {
        if (user[key] === "") {
          setValidate((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });
    }
  };

  const handleChange = (value, check, field) => {
    if (check) {
      setValidate((prev) => ({
        ...prev,
        [field]: true,
      }));
      setUser((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [field]: "",
      }));
      setValidate((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    fetch(
      `${process.env.REACT_APP_API_URL}/email/verify/resend?api_token=${assetToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-screen py-10 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 flex justify-center items-center relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="min-w-[500px] max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <div className="mb-4">
              <h1 className="text-center text-2xl font-bold">Register</h1>
            </div>
            {assetToken === "" ? (
              <form
                onSubmit={handleSubmit}
                id="formLogin"
                className="grid grid-cols-2 gap-4"
              >
                <div className="col-span-1 mb-4 form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="full_name"
                    type="text"
                    placeholder="Full Name"
                    name="full_name"
                    onInput={(e) =>
                      handleChange(
                        e.target.value,
                        !validator.isEmpty(e.target.value),
                        "full_name"
                      )
                    }
                  />
                  <span className="form-message text-sm text-red-500 font-semibold">
                    {validate.full_name ? "" : "Full Name is required"}
                    {user.full_name &&
                      validate.full_name &&
                      !validator.isAlpha(user.full_name, "vi-VN", {
                        ignore: " ",
                      }) &&
                      "Full Name must be alphabet"}
                  </span>
                </div>
                <div className="col-span-1 mb-4 form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    onInput={(e) =>
                      handleChange(
                        e.target.value,
                        !validator.isEmpty(e.target.value),
                        "email"
                      )
                    }
                  />
                  <span className="form-message text-sm text-red-500 font-semibold">
                    {validate.email ? "" : "Email is required"}
                    {user.email &&
                      validate.email &&
                      !validator.isEmail(user.email) &&
                      "Email is invalid"}
                  </span>
                </div>
                <div className="col-span-1 mb-4 form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onInput={(e) =>
                      handleChange(
                        e.target.value,
                        !validator.isEmpty(e.target.value),
                        "password"
                      )
                    }
                  />
                  <span className="form-message text-sm text-red-500 font-semibold">
                    {validate.password ? "" : "Password is required"}
                    {user.password &&
                      validate.password &&
                      !validator.isLength(user.password, {
                        min: 6,
                        max: undefined,
                      }) &&
                      "Password must be at least 6 characters"}
                  </span>
                </div>
                <div className="col-span-1 mb-4 form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    onInput={(e) => {
                      if (user.password !== "") {
                        validator.equals(e.target.value, user.password)
                          ? setValidate((prev) => ({
                              ...prev,
                              confirm_password: true,
                            }))
                          : setValidate((prev) => ({
                              ...prev,
                              confirm_password: false,
                            }));
                      } else {
                        setValidate((prev) => ({
                          ...prev,
                          confirm_password: true,
                        }));
                      }
                    }}
                  />
                  <span className="form-message text-sm text-red-500 font-semibold">
                    {validate.confirm_password
                      ? ""
                      : "Confirm Password not match"}
                  </span>
                </div>
                <div className="col-span-2 mb-4 form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gender
                  </label>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <label htmlFor="gender" className="mr-2">
                        Female
                      </label>
                      <input
                        type="radio"
                        name="gender"
                        value="f"
                        defaultChecked
                      />
                    </div>
                    <div className="mr-4">
                      <label htmlFor="gender" className="mr-2">
                        Male
                      </label>
                      <input type="radio" name="gender" value="m" />
                    </div>
                    <div>
                      <label htmlFor="gender" className="mr-2">
                        Other
                      </label>
                      <input type="radio" name="gender" value="o" />
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="date_birth"
                    type="date"
                    placeholder="Date of Birth"
                    name="date_birth"
                    onInput={(e) => {
                      handleChange(
                        e.target.value,
                        validator.isDate(e.target.value),
                        "date_birth"
                      );
                    }}
                  />
                  <span className="form-message text-sm text-red-500 font-semibold">
                    {validate.date_birth ? "" : "Date of Birth is required"}
                  </span>
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone_number"
                    type="text"
                    placeholder="Phone Number"
                    name="phone_number"
                    onInput={(e) =>
                      handleChange(
                        e.target.value,
                        !validator.isEmpty(e.target.value),
                        "phone_number"
                      )
                    }
                  />
                  <span className="form-message text-sm text-red-500 font-semibold">
                    {validate.phone_number ? "" : "Format is not valid"}
                    {user.phone_number &&
                      validate.phone_number &&
                      !validator.isMobilePhone(user.phone_number, "vi-VN") &&
                      "Format is not valid"}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <Link
                    to="/login"
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Already have an account?
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h1>Verify Email</h1>

                {message === "" ? (
                  <>
                    <p>Please check your email to verify your account</p>
                    <p>
                      If you did not receive the email, please click{" "}
                      <span
                        onClick={handleResend}
                        className="cursor-pointer text-prihover text-lgr"
                      >
                        here
                      </span>{" "}
                      to resend
                    </p>
                  </>
                ) : (
                  <p>{message}</p>
                )}
                <p>
                  If you verify your account, click{" "}
                  <Link to="/login" className="text-prihover text-lg">
                    here
                  </Link>{" "}
                  to login
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Link
        to="/login"
        className="absolute top-4 left-4 border border-prihover bg-white py-2 px-4 rounded-xl hover:bg-prihover hover:text-white flex items-center"
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
        <span className="ml-2">Back to Login</span>
      </Link>
    </div>
  );
}

export default Register;
