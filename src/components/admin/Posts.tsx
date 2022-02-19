import { Link } from 'react-router-dom';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { PostsComponentProps } from '../../types';

const Posts = ({ isLoading, posts }: PostsComponentProps): JSX.Element =>
  isLoading ? (
    <p>Waiting for data to load...</p>
  ) : (
    <div className="container mx-auto flex justify-center">
      {!posts || posts.length === 0 ? (
        <p>No post found.</p>
      ) : (
        <div className="w-full mx-52">
          <table className="table-auto w-full mb-5 border-collapse">
            <thead>
              <tr>
                <th className="p-4 pb-5 border-b text-left">ID</th>
                <th className="p-4 pb-5 border-b text-left">Category</th>
                <th className="p-4 pb-5 border-b text-left">Title</th>
                <th className="p-4 pb-5 border-b text-left">Status</th>
                <th className="p-4 pb-5 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(({ id, category, title, status }) => (
                <tr
                  key={id}
                  className="py-2 odd:bg-slate-100 even:bg-white dark:odd:bg-slate-800 dark:even:bg-slate-700"
                >
                  <td className="p-3 text-left">{id}</td>
                  <td className="p-3 text-left">{category.name}</td>
                  <td className="p-3 text-left">{title}</td>
                  <td className="p-3 text-left">{status}</td>
                  <td className="flex justify-around p-3">
                    <button type="button" className="text-2xl">
                      <Link to={`edit/${id}`}>
                        <MdEdit />
                      </Link>
                    </button>
                    <button type="button" className="text-2xl">
                      <Link to={`delete/${id}`}>
                        <MdDeleteForever />
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
            <button type="button" className="p-2 rounded-md bg-teal-400 text-white">
              <Link to="create">New post</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );

export default Posts;
