import { useContext, useMemo } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel} = useContext(ChallengeContext);

  const percentToNextLevel = useMemo(() => {
    return (currentExperience * 100) / experienceToNextLevel;
  }, [currentExperience, experienceToNextLevel])

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%`}} />

        <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}> {currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}