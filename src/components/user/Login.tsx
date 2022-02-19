import { ChangeEvent, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, Location } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axiosInstance from '../../api/axios';
import { LoginFormDataInterface } from '../../types';
import { useUserContext } from '../../context/UserContext';
import useLocalStorage from '../../utils/useLocalStorage';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const state = location.state as { from: Location };
    if (state && state.from) {
      return state.from.pathname;
    }
    return '/';
  }, [location]);

  const userContext = useUserContext();

  const initialFormData = Object.freeze<LoginFormDataInterface>({
    email: '',
    password: '',
  });

  const [formData, setFormData] = useState<LoginFormDataInterface>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const getUser = () => {
    axiosInstance
      .get('user/profile')
      .then((response) => {
        userContext?.setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .then(() => {
        navigate(from);
      })
      .catch((error) => console.log(error.response));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axiosInstance
      .post(`user/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        localStorage.setItem('access_token', `JWT ${response.data.access}`);
        localStorage.setItem('refresh_token', response.data.refresh);
      })
      .then(() => {
        getUser();
      })
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {
    if (userContext?.user !== null) {
      navigate('/', { replace: true });
    }
  });

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
              <input
                className="form-input w-full rounded border border-slate-400 text-black"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group my-2">
            <label htmlFor="password" className="mb-1">
              Password
              <input
                className="form-input w-full rounded border border-slate-400 text-black"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="p-2 my-4 text-white rounded bg-blue-400"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <div className="flex flex-col items-end">
            <Link to="/" className="mb-1">
              Forgot password?
            </Link>
            <Link to="/register">Don&apos;t have an account? Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
