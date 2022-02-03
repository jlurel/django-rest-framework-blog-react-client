import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { Post as IPost } from "../types";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<IPost>({
    id: 1,
    author: 1,
    title: "",
    excerpt: "",
    content: "",
    status: "published",
    category: 1,
    slug: "",
  });

  useEffect(() => {
    axiosInstance.get(slug as string).then((response) => {
      setPost(response.data);
    });
  }, [slug, setPost]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center p-3">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="md:text-lg">{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
