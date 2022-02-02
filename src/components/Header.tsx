import React from "react";

const Header = () => {
  return (
    <div className="flex h-[50px] mb-2 px-3 items-center shadow-md">
      <h1 className="text-lg grow">
        <a href="/" className="visited:no-underline visited:text-black">
          Header
        </a>
      </h1>
      <nav>
        <a href="/register" className="visited:no-underline visited:text-black">
          Register
        </a>
        <a href="/login">
          <button className="p-2 mx-2 rounded border border-slate-500 hover:text-white hover:bg-slate-500">
            Login
          </button>
        </a>
        <a href="/logout">
          <button className="p-2 mx-2 rounded border border-slate-500 hover:text-white hover:bg-slate-500">
            Logout
          </button>
        </a>
      </nav>
    </div>
  );
};

export default Header;
