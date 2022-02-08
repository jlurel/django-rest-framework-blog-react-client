import { useContext } from "react";
import UserContext from "../context/UserContext";

const UserProfile = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-2xl">Account</h1>
      <p>Email: {userContext?.user?.email}</p>
      <p>Username: {userContext?.user?.username}</p>
      <p>About: {userContext?.user?.about}</p>
    </div>
  );
};

export default UserProfile;
