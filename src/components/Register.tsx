import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { RegisterFormDataType } from "../types";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const initialFormData = Object.freeze<RegisterFormDataType>({
    email: "",
    username: "",
    password: "",
  });
  const [formData, setFormData] =
    useState<RegisterFormDataType>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axiosInstance
      .post(`user/register/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then((response) => {
        navigate(`/login`);
        console.log(response);
      });
  };
  return (
    <div className="container mx-auto">
      <div className="flex flex-col p-2 items-center">
        <div className="flex items-center justify-center text-white text-2xl w-12 h-12 bg-red-400 rounded-full">
          <FaUser />
        </div>
        <h1 className="text-3xl">Sign up</h1>
        <form noValidate className="flex flex-col">
          <div className="form-group my-2">
            <label htmlFor="email" className="mb-1">
              Email address
            </label>
            <input
              className="form-input w-full rounded border border-slate-400 text-black"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              className="form-input w-full rounded border border-slate-400 text-black"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              className="form-input w-full rounded border border-slate-400 text-black"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="p-2 my-4 text-white rounded bg-blue-400"
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <div className="flex justify-end">
            <Link to={`#`}>Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
