import { Context, createContext, useContext, useState } from 'react';
import axiosInstance from '../api/axios';
import { UserContextInterface, ChildrenProps } from '../types';
import useLocalStorage from '../utils/useLocalStorage';

const UserContext: Context<UserContextInterface | null> =
  createContext<UserContextInterface | null>(null);

export const UserContextProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') as string));

  const login = () => {
    console.log(axiosInstance.defaults.headers);
    axiosInstance
      .get('user/profile')
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => console.log(error.response));
  };

  const logout = () => {
    axiosInstance
      .post('user/logout', {
        refresh_token: localStorage.getItem('refresh_token'),
      })
      .then((response) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers.common.Authorization = '';
        setUser(null);
        localStorage.removeItem('user');
      })
      .catch((error) => error.response);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
