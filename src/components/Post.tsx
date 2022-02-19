import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { PostInterface } from '../types';

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<PostInterface | null>(null);

  useEffect(() => {
    axiosInstance.get(`posts/${slug as string}`).then((response) => {
      setPost(response.data);
    });
  }, [slug, setPost]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center p-3">
        {post ? (
          <>
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <h2 className="px-4 py-1 text-sm rounded-2xl bg-gray-400 text-white dark:bg-gray-600">
              {post.category.name}
            </h2>
            <div
              className="max-w-[720px] m-5 md:text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </>
        ) : (
          <p>Couldn&apos;t retrieve the post.</p>
        )}
      </div>
    </div>
  );
};

export default Post;
