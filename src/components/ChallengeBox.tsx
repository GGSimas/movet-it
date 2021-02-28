import { useCallback, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountdowContext } from '../contexts/CountdownContext';
import style from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengeContext);
  const { resetCountdown } = useContext(CountdowContext)

  const handleChallengeSucceeded = useCallback(() => {
    completedChallenge();
    resetCountdown();
  }, [completedChallenge, resetCountdown]);

  const handleChallengeFailed = useCallback(() => {
    resetChallenge()
    resetCountdown();
  }, [resetCountdown, resetChallenge]);

  return (
    <div className={style.challengeboxContainer}>
      { activeChallenge ? (
        <div className={style.challengeActive}>
          <header> Ganhe {activeChallenge.amount} de xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button"
              className={style.failedChallengeButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button 
              type="button"
              className={style.succeedeedChallengeButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ): (
        <div className={style.challengeNotActive}>
        <strong>
          FInalize um ciclo para receber desafios a serem completados
        </strong>
        <p>
          <img src="icons/level-up.svg" alt="level up"/>
          Avance de level completando desafios!
        </p>
      </div>
      )}
    </div>
  )
}