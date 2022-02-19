import React, { MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstance
      .delete(`posts/admin/${id}/delete`)
      .then(() => {
        navigate('/posts/admin');
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="container mx-auto flex justify-center">
      <button
        type="button"
        className="p-2 rounded-md bg-teal-400 text-white"
        onClick={handleSubmit}
      >
        Press here to confirm delete
      </button>
    </div>
  );
};

export default DeletePost;
