import styles from './Header.module.scss';
import UserBadge from '../UserBadge/UserBadge';
import {IUserProfile} from '../../services/spotify';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';

interface IHeaderProps {
  userProfile: IUserProfile
}

const Header = (props: IHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.nav_button_wrapper}>
        <button
          type="button"
          className={styles.nav_button}
        >
          <AiOutlineLeft />
        </button>
        <button
          type="button"
          className={styles.nav_button}
        >
          <AiOutlineRight />
        </button>
      </div>
      <UserBadge userProfile={props.userProfile} />
    </header>
  )
}

export default Header;
