import {useEffect} from "react";
import Header from "../../components/Header/Header";
import {getUserProfile} from "../../services/spotify";
import styles from './Home.module.scss';

const Home = () => {
  useEffect(() => {
    getUserProfile();
  }, [])

  return (
    <main className={styles.home}>
      <Header/>
    </main>
  )
}

export default Home;
