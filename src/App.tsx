import React, { useEffect, useState } from 'react';
import Posts from './components/Posts';
import { useSearchContext } from './context/SearchContext';
import { PostInterface } from './types';

const App = () => {
  const { searchTerms } = useSearchContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[] | never[]>([]);

  const getPosts = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/posts`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setPosts(data);
        console.log(data);
      });
  };

  const searchPostsWithTerms = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/posts?search=${searchTerms}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setPosts(data);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (searchTerms.length === 0 || searchTerms.trim() === '') {
      getPosts();
    } else {
      searchPostsWithTerms();
    }
  }, [searchTerms]);

  return (
    <div className="container mx-auto mb-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10">Latest Posts</h1>
      <Posts isLoading={loading} posts={posts} />
    </div>
  );
};

export default App;
