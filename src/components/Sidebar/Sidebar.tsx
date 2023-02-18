import styles from './Sidebar.module.scss';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import SpotifyLogo from "../../assets/spotify-logo.png";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo_container}>
        <img className={styles.logo} src={SpotifyLogo} alt="" />
      </div>
      <div className={styles.item}>
       <AiOutlineHome className={styles.icon} />
       Home
      </div>
      <div className={styles.item}>
       <AiOutlineSearch className={styles.icon} />
       Search
      </div>
    </aside>
  )
}

export default Sidebar;
