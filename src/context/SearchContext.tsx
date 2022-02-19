import React, { createContext, useContext, useState } from 'react';
import { ChildrenProps, SearchContextInterface } from '../types';

const SearchContext = createContext<SearchContextInterface>({
  searchTerms: '',
  setSearchTerms: () => {},
});

export const SearchContextProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [searchTerms, setSearchTerms] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerms, setSearchTerms }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

export default SearchContext;
