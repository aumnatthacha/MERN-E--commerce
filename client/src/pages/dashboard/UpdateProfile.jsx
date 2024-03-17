/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.PhotoURL;
    updateUserProfile({ name, photoURL })
      .then(() => {
        alert("Profile Updated!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h3 className="font-bold text-lg mt-3">Update Your ProFile</h3>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="name"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload ProFile Photo</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
              {...register("PhotoURL")}
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Update"
              className="btn bg-red-700 text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;