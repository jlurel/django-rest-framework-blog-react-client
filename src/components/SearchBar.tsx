import { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import SearchContext from '../context/SearchContext';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const { setSearchTerms } = useContext(SearchContext);

  const [debouncedValue] = useDebounce(searchInput, 1000);

  useEffect(() => {
    if (debouncedValue) {
      setSearchTerms(debouncedValue);
    } else {
      setSearchTerms('');
    }
  }, [debouncedValue]);

  return (
    <div className="inline-flex items-center px-2 mx-2 bg-white text-black border border-slate-500 rounded">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search"
        className="w-full border-0 focus:border-0 focus:ring-0"
      />
      <FaSearch />
    </div>
  );
};

export default SearchBar;
