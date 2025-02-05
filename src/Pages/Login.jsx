import React, { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import "@fortawesome/fontawesome-free/css/all.min.css";
import loginImg from "../assets/others/login.jpg";
import { ContextApi } from "../AuthProvider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import usePublic from "../hooks/usePublic";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, googleSignIn } = useContext(ContextApi);
  const [disabled, setDisabled] = useState(true);
  const captchaRef = useRef();
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const axiosPublic = usePublic();

  const location = useLocation();
  // console.log(location)

  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Your Sign In Sucessfull",
          icon: "success",
        });
        navigate(location.state ? location.state : "/");
      });
    });
  };

  const handleFrom = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "Sign In Sucessfull",
          icon: "success",
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed!",
          text: "Sorry Your Information Is Incorrect",
          icon: "error",
        });
      });
  };

  const handleValidate = () => {
    const useCaptcha = captchaRef.current.value;
    if (validateCaptcha(useCaptcha) === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login || Bistro</title>
      </Helmet>
      <div className="hero bg-base-200 py-5 flex items-center justify-center px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center shadow-lg bg-white rounded-lg overflow-hidden w-full max-w-5xl">
          {/* Left Side with Image */}
          <div className="w-full lg:w-1/2 bg-base-100 flex items-center justify-center p-10">
            <img
              src={loginImg} // Replace this with your image URL
              alt="Login Illustration"
              className="max-w-full"
            />
          </div>
          {/* Right Side with Form */}
          <div className="w-full lg:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800">
              Login
            </h1>
            <form onSubmit={handleFrom} className="space-y-6 mt-6">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* Captcha Input */}
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  ref={captchaRef}
                  name="captcha"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  onClick={handleValidate}
                  className="btn btn-outline btn-sm mt-3"
                >
                  Validate
                </button>
              </div>
              {/* Login Button */}
              <div className="form-control">
                <button
                  disabled={disabled}
                  className="btn btn-primary w-full py-2"
                >
                  Sign In
                </button>
              </div>
            </form>
            {/* Additional Options */}
            <div className="mt-4 text-center">
              <p className="text-sm">
                New here?{" "}
                <Link to={"/signup"} className="text-blue-500 font-medium">
                  Create a New Account
                </Link>
              </p>

              <p className="text-xl font-semibold ">Or Sign In With</p>
              <div className="flex justify-center items-center mt-4 space-x-4">
                <button className="btn btn-circle btn-outline">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-circle btn-outline"
                >
                  <i className="fab fa-google"></i>
                </button>
                <button className="btn btn-circle btn-outline">
                  <i className="fab fa-twitter"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
