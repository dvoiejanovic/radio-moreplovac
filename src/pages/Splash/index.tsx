
import {authorize} from '../../services/spotify'
import styles from './styles.module.scss';


function App() {
  return (
    <main className={styles.splash}>
      <div className={styles.headline}>
        Radio Moreplovac
      </div>
      <button className={styles.button} type="button" onClick={authorize}>
        Login
      </button>
    </main>
  )
}

export default App;
