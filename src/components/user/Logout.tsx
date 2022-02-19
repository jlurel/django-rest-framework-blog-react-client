import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const Logout = () => {
  const navigate = useNavigate();

  const userContext = useUserContext();

  useEffect(() => {
    if (userContext) {
      userContext.logout();
      navigate('/');
    }
  }, []);

  return <div>Logout</div>;
};

export default Logout;
