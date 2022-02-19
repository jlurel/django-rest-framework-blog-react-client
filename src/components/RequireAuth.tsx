import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ChildrenProps } from '../types';

const RequireAuth = ({ children }: ChildrenProps): JSX.Element => {
  const accessToken = localStorage.getItem('access_token');
  const location = useLocation();

  if (!accessToken) {
    console.log(location);
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
