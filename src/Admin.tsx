import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axios';
import Posts from './components/admin/Posts';
import { PostInterface } from './types';

const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[] | never[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance.get(`posts/admin`).then((response) => {
      setPosts(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container mx-auto mb-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10">Admin</h1>
      <Posts isLoading={isLoading} posts={posts} />
    </div>
  );
};

export default Admin;
