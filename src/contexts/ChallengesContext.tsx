import { createContext, useCallback, useState, ReactNode, useMemo, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal'



interface ChallengeContextProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface Challenge {
  type: string;
  description: string;
  amount: number;
}

interface ChallengeContextProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}



export const ChallengeContext = createContext<ChallengeContextProps>({} as ChallengeContextProps);

export function ChallengeContextProvider ({ children, ...rest }: ChallengeContextProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState<number>(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState<number>(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalUp] = useState(false);

  const experienceToNextLevel = useMemo(() => {
    const nextLevel = Math.pow((level + 1) * 4, 2);
    return nextLevel;
  }, [level]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted]);

  const levelUp = useCallback(() => {
    setLevel((oldLevel) => oldLevel + 1)
    setIsLevelUpModalUp(true);
  }, []);

  const startNewChallenge = useCallback(() => {
    const randowChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randowChallengeIndex];
    setActiveChallenge(challenge);
    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉🎉🎉🎉', {
        body: `Valendo ${challenge.amount}xp`,
        icon:'/favicon.png'
      })
    }
  }, []);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, [])

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalUp(false);
  }, [])

  const completedChallenge = useCallback(() => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setActiveChallenge(null);
    setCurrentExperience(finalExperience);
    setChallengesCompleted(oldChallengesCompleted => oldChallengesCompleted + 1);
  }, [activeChallenge, currentExperience, experienceToNextLevel])

  return (
    <ChallengeContext.Provider value={{
      level, 
      currentExperience,
      challengesCompleted, 
      activeChallenge,
      experienceToNextLevel,
      levelUp, 
      startNewChallenge,
      resetChallenge,
      completedChallenge,
      closeLevelUpModal
    }}>
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}

