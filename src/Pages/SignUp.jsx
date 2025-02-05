import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import signUpImg from "../assets/others/signUp.jpg";
import { ContextApi } from "../AuthProvider/AuthContext";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import usePublic from "../hooks/usePublic";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser,googleSignIn,updateUserProfile } = useContext(ContextApi);
  const axiosPublic = usePublic();

  // google sign In
  const handleGoogleLogin = () => {
    googleSignIn()
    .then(result => {
      const userInfo = {
        name: result.user?.displayName,
        email : result.user?.email,
      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        Swal.fire({
          title: "Success!",
          text: "Your Sign Up Sucessfull",
          icon: "success"
        });
        navigate(location.state? location.state :'/');
      })
    })
  }

  const handleFrom = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
   
    createUser(email, password)
    .then(result => {
      updateUserProfile(name,photo)
      .then(() => {
        const userInfo = {
          name,
          email
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          if(res.data.insertedId){
            Swal.fire({
              title: "Success!",
              text: "Your Sign Up Sucessfull",
              icon: "success"
            });
            navigate(location.state? location.state :'/');
          }
        })
      })
      .catch(err => {
        Swal.fire({
          title: "Sorry!",
          text: 'Sign Up Failed',
          icon: "error"
        });
      })
    })
  };
  return (
    <>
      <Helmet>
        <title>SignUp || Bistro</title>
      </Helmet>
      <div className="hero bg-base-200 py-5 flex items-center justify-center px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row-reverse items-center shadow-lg bg-white rounded-lg overflow-hidden w-full max-w-5xl">
          {/* Left Side with Image */}
          <div className="w-full lg:w-1/2 bg-base-100 flex items-center justify-center p-10">
            <img
              src={signUpImg} // Replace this with your image URL
              alt="Login Illustration"
              className="max-w-full"
            />
          </div>
          {/* Right Side with Form */}
          <div className="w-full lg:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800">
              Sign Up
            </h1>
            <form onSubmit={handleFrom} className="space-y-6 mt-6">
              {/* Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Photo Url Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Your Photo URL"
                  className="input input-bordered w-full"
                  required
                />
              </div>

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

              {/* Login Button */}
              <div className="form-control">
                <button className="btn btn-primary w-full py-2">Sign Up</button>
              </div>
            </form>
            {/* Additional Options */}
            <div className="mt-4 text-center">
              <p className="text-sm">
                Already Have an Account ?{" "}
                <Link to={"/login"} className="text-blue-500 font-medium">
                  Please Sign In
                </Link>
              </p>

              <p className="text-xl font-semibold ">Or Sign Up With</p>
              <div className="flex justify-center items-center mt-4 space-x-4">
                <button className="btn btn-circle btn-outline">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
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

export default SignUp;
