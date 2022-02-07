import { KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState<string>("");

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
      <nav>
        {localStorage.getItem("access_token") === null ? (
          <>
            <a
              href="/register"
              className="visited:no-underline visited:text-white"
            >
              Register
            </a>
            <a href="/login">
              <button className="p-2 mx-2 rounded border border-slate-500 hover:bg-slate-500">
                Login
              </button>
            </a>
          </>
        ) : (
          <a href="/logout">
            <button className="p-2 mx-2 rounded border border-slate-500 hover:bg-slate-500">
              Logout
            </button>
          </a>
        )}
      </nav>
    </div>
  );
};

export default Header;
