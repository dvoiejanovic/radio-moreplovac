import styles from './styles.module.scss';
import UserBadge from '~/components/UserBadge';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import {IUserProfile} from '~/models/user-profile';

interface IHeaderProps {
  userProfile?: IUserProfile
}

const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const goForward = () => {
    navigate(1);
  }

  return (
    <header className={styles.header}>
      <div className={styles.nav_button_wrapper}>
        <button
          type="button"
          className={styles.nav_button}
          onClick={goBack}
        >
          <AiOutlineLeft />
        </button>
        <button
          type="button"
          className={styles.nav_button}
          onClick={goForward}
        >
          <AiOutlineRight />
        </button>
      </div>
      <UserBadge userProfile={props.userProfile} />
    </header>
  )
}

export default Header;
