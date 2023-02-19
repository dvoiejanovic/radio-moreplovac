import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from './Home.module.scss';

const Home = () => {
  return (
    <main className={styles.home}>
      <Header/>
      <Sidebar />
    </main>
  )
}

export default Home;
