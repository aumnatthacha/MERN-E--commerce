/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { login, createUser, signUpWithGoogle } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const from = location?.state?.pathname || "/";

  const closeModal = () => {
    const modal = document.getElementById(name);
    if (modal) {
      modal.close();
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (isLogin) {
      login(data.email, data.password)
        .then((result) => {
          const user = result.user;
          //console.log(user);
          document.getElementById(name).close();
          navigate(from, { replace: true });
          alert("Login Successful");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createUser(data.email, data.password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          alert("Sign Up Successful");
          document.getElementById("login").close();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const GoogleSignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        console.log("result",result)
        const user = result.user;
        console.log("user",user);
        navigate(from, { replace: true });
        alert("Google Sign Up Successful");
        document.getElementById("login").close();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <div className="max-w-md w-full mx-auto flex items-center justify-center my-20">
        <div className="modal-box action mt-0 flex flex-col justify-center">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">
              {isLogin ? "Please Login!" : "Sign Up Now!"}
            </h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />
              {!isLogin && (
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value={isLogin ? "Login" : "Sign Up"}
                className="btn bg-red text-white"
              />
            </div>
            <p className="text-center my-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="underline text-red-700 ml-1"
                onClick={toggleForm}
              >
                {isLogin ? "Sign Up Now" : "Login"}
              </button>
            </p>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </form>
          <div className="text-center space-x-3 mb-5">
            <button
              onClick={GoogleSignUp}
              className="btn btn-ghost btn-circle hover:bg-red hover:text-white"
            >
              <BiLogoGmail />
            </button>
            <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
              <FaGithubAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
