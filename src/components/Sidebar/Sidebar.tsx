import styles from './Sidebar.module.scss';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import {useNavigate} from 'react-router-dom';
import {GiPaperBoat} from "react-icons/gi";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo_container}>
        <GiPaperBoat className={styles.logo} />
        <div className={styles.title}>
          Radio <br/>
          Moreplovac
        </div>
      </div>
      <button
        className={styles.item}
        type="button"
        onClick={() => navigate('/')}
        >
       <AiOutlineHome className={styles.icon} />
       Home
      </button>
      <button
       type="button"
       className={styles.item}
       onClick={() => navigate('/search')}
      >
       <AiOutlineSearch className={styles.icon} />
       Search
      </button>
    </aside>
  )
}

export default Sidebar;
