import { Link } from 'react-router-dom';
import { PostsComponentProps } from '../types';

const Posts = ({ isLoading, posts }: PostsComponentProps) => {
  if (isLoading) return <p>Waiting for data to load...</p>;
  if (!posts || posts.length === 0) return <p>No post found.</p>;
  return (
    <div className="container xl:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
        {posts?.map(({ id, category, title, slug, image }) => (
          <div className="h-full">
            <Link to={`/posts/${slug}`} key={id} className="h-full">
              <div className="flex flex-col rounded-lg shadow-lg shadow-gray-500 dark:shadow-black">
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                  className="relative h-[250px] w-full mb-6 rounded-lg bg-center bg-cover"
                >
                  <div className="absolute bottom-2 right-2 px-2 bg-gray-500 text-white rounded-md">
                    {category.name}
                  </div>
                </div>
                <div className="flex grow shrink h-[80px] px-5 mb-2">
                  <h1 className="text-lg font-bold">{title}</h1>
                </div>
                <div className="flex">
                  <h2 className="text-base">{category.name}</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
