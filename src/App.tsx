import { useEffect, useState } from "react";
import Posts from "./components/Posts";
import { Post } from "./types";

const App = () => {
  const [appState, setAppState] = useState<{
    loading: Boolean;
    posts: never[] | Post[];
  }>({
    loading: false,
    posts: [],
  });

  useEffect(() => {
    setAppState({ ...appState, loading: true });
    const apiUrl = "http://localhost:8000/api/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setAppState({ loading: false, posts: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto mb-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10">Latest Posts</h1>
      <Posts isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
};

export default App;
