import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";

interface CountdownContext {
 isActive: boolean;
 hasFinish: boolean;
 minutes: number;
 seconds: number;
 startCountdown: () => void;
 resetCountdown: () => void;
}

interface CountdownContextProvider {
  children: ReactNode;
}
export const CountdowContext = createContext({} as CountdownContext);

let countdownTimeOut: NodeJS.Timeout;

export function CountdownContextProvider({ children }: CountdownContextProvider) {
  const { startNewChallenge } = useContext(ChallengeContext);
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] =useState(false);
  const [hasFinish, setHasFinish] =useState(false);
  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  function resetCountdown () {
    clearTimeout(countdownTimeOut);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinish(false);
  }

  function startCountdown () {
    setIsActive(true);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(()=> {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinish(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])
  
  return (
    <CountdowContext.Provider value={{
      hasFinish,
      isActive,
      minutes,
      seconds,
      resetCountdown,
      startCountdown
    }} >
      {children}
    </CountdowContext.Provider>
  );
}