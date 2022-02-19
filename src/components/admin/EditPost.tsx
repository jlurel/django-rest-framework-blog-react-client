import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axiosInstance from '../../api/axios';
import { useUserContext } from '../../context/UserContext';
import { CategoryInterface, PostFormDataInterface } from '../../types';
import slugify from '../../utils/slugify';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const userContext = useUserContext();

  const userId = userContext?.user?.id as number;

  const [categories, setCategories] = useState<CategoryInterface[] | never[]>([]);

  const initialFormData: PostFormDataInterface = {
    title: '',
    slug: '',
    excerpt: '',
    category: 1,
    status: 'published',
    image: null,
  };

  const [newImage, setNewImage] = useState<File | null>(null);

  const [content, setContent] = useState<string>('');

  const [formData, setFormData] = useState<PostFormDataInterface>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === 'title') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        slug: slugify(e.target.value.trim()),
      });
    } else if (e.target.name === 'image') {
      const target = e.target as HTMLInputElement;
      const image: File = (target.files as FileList)[0];
      setFormData({
        ...formData,
        image,
      });
    } else if (e.target.name === 'slug') {
      setFormData({
        ...formData,
        slug: slugify(e.target.value.trim()),
      });
    } else if (e.target.name === 'category') {
      setFormData({
        ...formData,
        category: Number(e.target.value),
      });
    } else if (e.target.name === 'publish') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        status: target.checked ? 'published' : 'draft',
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('content', content);
    data.append('excerpt', formData.excerpt);
    data.append('category', formData.category.toString());
    data.append('author', userId.toString());
    data.append('status', formData.status);
    if (newImage) {
      data.append('image', newImage, newImage.name);
    }

    axiosInstance
      .put(`posts/admin/${id}/edit`, data)
      .then((response) => navigate('/posts/admin'))
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {
    axiosInstance
      .get(`posts/admin/${id}/edit`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          slug: response.data.slug,
          excerpt: response.data.excerpt,
          category: response.data.category.id,
          status: response.data.status,
          image: response.data.image,
        });
        setContent(response.data.content);
        console.log(response.data.image);
      })
      .catch((error) => console.log(error.response));

    axiosInstance
      .get('/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error.response));
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col py-2 items-center">
        <h1 className="text-2xl">Edit post</h1>

        <form method="post" className="flex flex-col items-start w-full p-10">
          <div className="form-group w-full my-5">
            <label htmlFor="title" className="w-full mb-3">
              Title
              <input
                type="text"
                id="title"
                name="title"
                className="form-input w-full rounded border text-black dark:bg-slate-700 dark:text-white"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-group w-full my-5">
            <label htmlFor="slug" className="w-full mb-3">
              Slug
              <input
                type="text"
                id="slug"
                name="slug"
                className="form-input w-full rounded border text-black dark:bg-slate-700 dark:text-white"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group w-full my-5">
            <label htmlFor="image" className="w-full mb-3">
              Image
              <input
                type="file"
                id="image"
                name="image"
                className="form-input w-full rounded border text-black dark:bg-slate-700 dark:text-white"
                onChange={handleChange}
              />
            </label>
            <img src={formData.image as string} alt="Post" className="w-1/3 h-auto mt-2" />
          </div>
          <div className="form-group w-full my-5">
            <label htmlFor="excerpt" className="w-full mb-3">
              Excerpt
              <input
                type="text"
                id="excerpt"
                name="excerpt"
                className="form-input w-full rounded border text-black dark:bg-slate-700 dark:text-white"
                value={formData.excerpt}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="text-editor w-full mb-3">
            <label className="w-full mb-3">Content</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>

          <div className="form-group w-full my-5">
            <label htmlFor="category">
              Category
              <select
                name="category"
                id="category"
                className="ml-3 dark:bg-slate-700 dark:text-white"
                value={formData.category}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {categories?.map(({ id: categoryId, name }) => (
                  <option key={categoryId} value={categoryId}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group w-full my-5">
            <label htmlFor="publish">
              Publish?
              <input
                type="checkbox"
                name="publish"
                id="publish"
                className="ml-3"
                checked={formData.status === 'published'}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="mt-5 p-2 rounded-md bg-teal-400 text-white"
              onClick={handleSubmit}
            >
              Edit
            </button>
            <button type="button" className="ml-2 p-2 rounded-md bg-red-400 text-white">
              <Link to={`/posts/admin/delete/${id}`}>Delete</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
