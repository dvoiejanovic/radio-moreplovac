import styles from './Header.module.scss';
import UserBadge from '../UserBadge/UserBadge';
import {IUserProfile} from '../../services/spotify';

interface IHeaderProps {
  userProfile: IUserProfile
}

const Header = (props: IHeaderProps) => {
  return (
    <header className={styles.header}>
      <div>
        // TODO: Navigation buttons
      </div>
      <UserBadge userProfile={props.userProfile} />
    </header>
  )
}

export default Header;
