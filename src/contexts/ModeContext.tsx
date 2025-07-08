import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface ModeType {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const Mode = createContext<ModeType>({ isDark: false, setIsDark: () => {} });

const ModeContext = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  return (
    <Mode.Provider value={{ isDark, setIsDark }}>{children}</Mode.Provider>
  );
};

export const useMode = () => {
  const context = useContext(Mode);
  if (context === undefined)
    throw new Error("ModeContext was used outside the ModeProvider");
  return context;
};

export default ModeContext;
