import {authorize} from './services/authorization'
import styles from './app.module.scss';


function App() {
  return (
    <div className={styles.app}>
      <div className={styles.headline}>
        Radio Moreplovac
      </div>
      <button className={styles.button} type="button" onClick={authorize}>
        Login
      </button>
    </div>
  )
}

export default App
