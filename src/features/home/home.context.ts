import { createContext } from "react";

interface HomeContextProps {
  showTimer: boolean;
  setShowTimer: (value: boolean) => void;
  timer: number;
  setTimer: (value: number) => void;
}

const HomeContext = createContext<HomeContextProps>({
  showTimer: false,
  setShowTimer: () => {},
  timer: 0,
  setTimer: () => {},
});

export default HomeContext;
