import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { LoginFormData } from "../types";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const initialFormData = Object.freeze<LoginFormData>({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers.common["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate(`/`);
        console.log(response);
      });
  };
  return (
    <div className="container mx-auto">
      <div className="flex flex-col p-2 items-center">
        <div className="flex items-center justify-center text-white text-2xl w-12 h-12 bg-red-400 rounded-full">
          <FaUser />
        </div>
        <h1 className="text-3xl">Sign in</h1>
        <form noValidate className="flex flex-col">
          <div className="form-group my-2">
            <label htmlFor="email" className="mb-1">
              Email address
            </label>
            <input
              className="form-input w-full rounded border border-slate-400"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              className="form-input w-full rounded border border-slate-400"
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
            Sign in
          </button>
          <div className="flex flex-col items-end">
            <Link to={`/`} className="mb-1">
              Forgot password?
            </Link>
            <Link to={`/register`}>Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
