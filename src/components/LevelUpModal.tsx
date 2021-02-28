import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import style from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
  const {level, closeLevelUpModal} = useContext(ChallengeContext)
  return (
    <div className={style.overlay}>
      <div className={style.levelUpModalContainer}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcanço um novo nível</p>


        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </button>
      </div>
    </div>
  );
}