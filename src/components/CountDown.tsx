import { useCallback, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountdowContext } from '../contexts/CountdownContext';
import styles from '../styles/components/CountDown.module.css';


export function CountDown() {
  const {
         minutes,
         seconds,
         hasFinish, 
         isActive, 
         startCountdown, 
         resetCountdown
        } = useContext(CountdowContext);

  const [minleft, minRight] =  String(minutes).padStart(2, '0').split('');
  const [secleft, secRight] = String(seconds).padStart(2, '0').split('');

 

  const renderButtons = useCallback(() => {
    if (hasFinish) {
     return (
      <button 
        disabled
        className={styles.CountDownButton}
      >
          Ciclo Encerrado
            <img style={{marginLeft: '5px'}} src="icons/check_circle.svg" alt="level"/>
      </button>
     ) 
    } else {
      return (
        <>
          {!isActive ? (
          <button 
            type="button" 
            className={styles.CountDownButton}
            onClick={startCountdown}>
              Iniciar um novo ciclo
              <img style={{marginLeft: '5px'}} src="icons/play_arrow.svg" alt="Iniciar Ciclo"/>
          </button>
        ) : (
          <button 
            type="button" 
            className={`${styles.CountDownButton} ${styles.CountDownButtonActive}`}
            onClick={resetCountdown}>
              Abandonar ciclo 
              <img style={{marginLeft: '5px'}} src="icons/Vector.svg" alt="Abandonar ciclo" />
          </button>
        )}
        </>
      )
    }
  }, [isActive, hasFinish]);
  return (
    <div>
        <div className={styles.countDownContainer}>
          <div>
            <span>{minleft}</span>
            <span>{minRight}</span>       
          </div>
            <span>:</span>
          <div>
            <span>{secleft}</span>
            <span>{secRight}</span>        
          </div>
        </div>
        {renderButtons()}
      </div>
  );
}