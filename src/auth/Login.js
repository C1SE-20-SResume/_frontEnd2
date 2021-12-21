import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {Validator} from "../Store";
import {Link} from "react-router-dom";
import "../Styles/Login.css";
import Forgotpass from "./Forgotpass";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Logo2 from "../assets/images/logo2.png";
function Login() {
  const [cookies, setCookie] = useCookies(["user"]);

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = (data) => {
    fetch(`${process.env.REACT_APP_API_URL}/password/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.emailForgotPass,
      }),
    })
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

  useEffect(() => {
    Validator({
      form: "#formLogin",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#email"),
        Validator.isRequired("#password"),
        Validator.isEmail("#email"),
        Validator.minLength("#password", 6),
      ],
      classError: "invalid",
      onSubmit: (e) => {},
    });
  });

  const handleSubmitLogin = (event) => {
    console.log(message);
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (email === "" || password === "") {
      alert("Please fill all the fields");
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.api_token) {
            setCookie("user", data.api_token, {path: "/"});
            window.location.href = "/";
          } else {
            setMessage(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      id="bg-login"
      className="w-full h-screen py-10 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 flex justify-center items-center"
    >
      <div className="container">
        <div className="flex  items-center justify-center h-full">
          <div className="text-left p-8">
            <img className="w-80 mb-3" src={Logo2} alt="logo" />
            <h3 className="text-3xl mb-3 uppercase  ml-2 text-white font-semibold">
              Login To You Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mx-3 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </h3>
            <p className="mb-3 text-white text-base ml-2">
              Quickly become a member of your favorite company.
              <br /> Please login to the system to be able to do it! good luck
            </p>
          </div>
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <h1 className="text-center text-2xl font-bold">Login</h1>

                <span
                  className={`text-red-500 mt-2  block py-3 px-5 text-center text-sm  ${
                    message !== "" ? "bg-red-300 text-red-600 " : ""
                  }`}
                >
                  {message !== "" && message}
                </span>
              </div>
              <form className="" onSubmit={handleSubmitLogin} id="formLogin">
                <div className="mb-4 form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />

                  <span className="form-message text-red-500 text-sm"></span>
                </div>
                <div className="mb-4 form-group">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                  <span className="form-message text-red-500 text-sm"></span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                      type="submit"
                    >
                      Sign In
                    </button>
                    or
                    <Link
                      to="/register"
                      className="text-blue-500 hover:text-blue-700 ml-2"
                    >
                      <span>Sign Up</span>
                    </Link>
                  </div>
                  <button
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    onClick={() => setShow(true)}
                    type="button"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {show ? (
          <div className="fixed shadow-2xl  rounded-lg bg-gray-200 p-5  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setShow(false)}
              className="absolute top-0 right-0 p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5 text-left">
                <h3 className="text-black text-lg font-bold">
                  Forgot password
                </h3>
              </div>
              <div className="mb-5">
                <label className="mr-3 font-medium">Email</label>
                <input
                  type="email"
                  name="emailForgotPass"
                  placeholder="Enter your email"
                  ref={register({
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email invalid (abc@xyz.qwe) ",
                    },
                  })}
                  className="px-3 py-2 rounded-lg"
                />
                {errors.emailForgotPass && (
                  <span
                    className="text-red-500 text-xs block mt-2"
                    id="errors-msg-register"
                  >
                    <ion-icon
                      id="errors-msg-register"
                      name="warning"
                    ></ion-icon>
                    {errors.emailForgotPass?.message}
                  </span>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Link
        to="/home"
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
        <span className="ml-2">Back to Home</span>
      </Link>
    </div>
  );
}

export default Login;
