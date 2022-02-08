import { KeyboardEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import UserContext from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const userContext = useContext(UserContext);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  };

  const search = () => {
    if (searchTerms !== "") {
      console.log(searchTerms);
      navigate("/search", { state: searchTerms });
      if (window.location.pathname === "/search") {
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex h-[50px] mb-2 px-3 items-center shadow-lg shadow-gray-900">
      <h1 className="text-lg grow">
        <a href="/" className="visited:no-underline visited:text-white">
          Header
        </a>
      </h1>
      <div className="grow inline-flex items-center px-2 mx-2 bg-white text-black border border-slate-500 rounded">
        <input
          type="text"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          placeholder="Search"
          className="w-full border-0 focus:border-0 focus:ring-0"
        />
        <button onClick={() => search()}>
          <FaSearch />
        </button>
      </div>
      <nav className="md:ml-5">
        {userContext?.user === null ? (
          <>
            <Link
              to="/register"
              className="visited:no-underline visited:text-white"
            >
              Register
            </Link>
            <Link to="/login">
              <button className="p-2 mx-2 rounded border border-slate-500 hover:bg-slate-500">
                Login
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={`/account`}>Account</Link>
            <Link to={`/logout`}>
              <button className="p-2 mx-2 rounded border border-slate-500 hover:bg-slate-500">
                Logout
              </button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
