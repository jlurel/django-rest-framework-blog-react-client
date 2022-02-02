import { Post } from "../types";

const Posts = ({
  isLoading,
  posts,
}: {
  isLoading: Boolean;
  posts: never[] | Post[];
}) => {
  if (isLoading) return <p>Waiting for data to load...</p>;
  if (!posts || posts.length === 0) return <p>No post found.</p>;
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {posts.map(({ id, title, excerpt }) => (
          <div
            className="flex flex-col w-[380px] mx-5 rounded-lg shadow-md"
            key={id}
          >
            <div className="h-[250px] w-[380px] bg-cover bg-[url(https://source.unsplash.com/random)] rounded-lg"></div>
            <div className="flex flex-col p-2">
              <h1 className="text-lg font-bold">{title}</h1>
              <p>
                {excerpt.substring(0, excerpt.lastIndexOf(" ", 150))}
                ...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
