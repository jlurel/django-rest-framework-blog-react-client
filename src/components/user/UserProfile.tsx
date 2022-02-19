import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const UserProfile = () => {
  const userContext = useUserContext();

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-2xl">Account</h1>
      <div className="flex flex-col items-center">
        <p>Email: {userContext?.user?.email}</p>
        <p>Username: {userContext?.user?.username}</p>
        <p>About: {userContext?.user?.about}</p>
      </div>
      <div className="flex justify-start">
        <button className="p-2 rounded-md bg-teal-400 text-white" type="button">
          <Link to="/posts/admin">My posts</Link>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
