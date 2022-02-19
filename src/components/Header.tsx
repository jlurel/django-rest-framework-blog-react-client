import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useUserContext } from '../context/UserContext';
import { useThemeContext } from '../context/ThemeContext';
import SearchBar from './SearchBar';

const Header = () => {
  const userContext = useUserContext();
  const { isDark, toggleBlackTheme } = useThemeContext();

  return (
    <div className="flex h-[50px] mb-10 px-3 items-center shadow-lg shadow-gray-400 dark:shadow-black">
      <h1 className="text-lg grow">
        <Link to="/">Header</Link>
      </h1>
      <div className="grow mx-2">
        <SearchBar />
      </div>
      <nav className="md:ml-5">
        {userContext?.user === null ? (
          <>
            <Link to="/register" className="visited:no-underline visited:text-white">
              Register
            </Link>
            <Link to="/login">
              <button
                type="button"
                className="p-2 mx-2 rounded border border-slate-500 hover:bg-slate-500"
              >
                Login
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/account">Account</Link>
            <Link to="/logout">
              <button
                type="button"
                className="p-2 mx-2 rounded border border-slate-500 hover:bg-slate-500"
              >
                Logout
              </button>
            </Link>
          </>
        )}
      </nav>
      <div className="flex justify-center items-center">
        {isDark ? (
          <button
            type="button"
            className="p-2 rounded-full text-yellow-500 border border-gray-500"
            onClick={() => toggleBlackTheme(!isDark)}
          >
            <FaSun />
          </button>
        ) : (
          <button
            type="button"
            className="p-2 rounded-full text-purple-600 border border-gray-600"
            onClick={() => toggleBlackTheme(!isDark)}
          >
            <FaMoon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
