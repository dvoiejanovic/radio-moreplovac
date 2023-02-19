import styles from './Header.module.scss';
import UserBadge from '../UserBadge/UserBadge';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        // TODO: Navigation buttons
      </div>
      <UserBadge />
    </header>
  )
}

export default Header;
