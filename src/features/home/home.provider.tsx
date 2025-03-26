import { PropsWithChildren, useEffect, useState } from "react";
import HomeContext from "./home.context";

function HomeProvider({ children }: PropsWithChildren) {
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (showTimer && timer > 0) {
      const interval = setInterval(() => {
        const minus = timer - 1;
        setTimer(minus);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [showTimer, timer]);

  return (
    <HomeContext.Provider value={{ showTimer, setShowTimer, timer, setTimer }}>
      {children}
    </HomeContext.Provider>
  );
}

export default HomeProvider;
