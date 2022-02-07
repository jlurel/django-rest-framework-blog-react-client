import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../api/axios";
import { Post } from "../types";

const Search = () => {
  const location = useLocation();
  const search = location.state;
  const [posts, setPosts] = useState<never[] | Post[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`?search=${search}`)
      .then((response) => setPosts(response.data));
  }, []);

  return (
    <div className="container mx-auto mb-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10">Search results</h1>
      {!posts || posts.length === 0 ? (
        <p className="text-center">No post found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {posts.map(({ id, title, excerpt, slug }) => (
            <Link to={`/${slug}`} key={id}>
              <div className="flex flex-col w-[380px] mx-5 rounded-lg shadow-md">
                <div className="h-[250px] w-[380px] bg-cover bg-[url(https://source.unsplash.com/random)] rounded-lg"></div>
                <div className="flex flex-col p-2">
                  <h1 className="text-lg font-bold">{title}</h1>
                  <p>
                    {excerpt.substring(0, excerpt.lastIndexOf(" ", 150))}
                    ...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
