import { GetServerSideProps } from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import {ExperienceBar} from '../components/ExperienceBar';
import { Perfil } from '../components/Perfil';
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownContextProvider } from '../contexts/CountdownContext';
import {ChallengeContextProvider} from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengeContextProvider
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      <ExperienceBar />

      <CountdownContextProvider>
        <section>
          <div>
            <Perfil />
            <CompletedChallenges /> 
            <CountDown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownContextProvider>
    </div>
  </ChallengeContextProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
