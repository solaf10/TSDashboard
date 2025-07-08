import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface SearchKeyType {
  searchedKey: string;
  setSearchedKey: Dispatch<SetStateAction<string>>;
}

const Search = createContext<SearchKeyType>({
  searchedKey: "",
  setSearchedKey: () => {},
});

const SearchContext = ({ children }: { children: ReactNode }) => {
  const [searchedKey, setSearchedKey] = useState<string>("");
  return (
    <Search.Provider value={{ searchedKey, setSearchedKey }}>
      {children}
    </Search.Provider>
  );
};

export const useSearchKeys = () => {
  const context = useContext(Search);
  if (context === undefined)
    throw new Error("SearchContext was used outside the SearchProvider");
  return context;
};

export default SearchContext;
